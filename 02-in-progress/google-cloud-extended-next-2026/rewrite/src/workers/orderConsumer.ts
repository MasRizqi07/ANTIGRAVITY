import Redis from 'ioredis';
import { TicketRepository } from '../repositories/ticketRepository';
import { OrderRepository } from '../repositories/orderRepository';
import { PaymentService } from '../services/paymentService';

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

export class OrderConsumer {
  private ticketRepo = new TicketRepository();
  private orderRepo = new OrderRepository();
  private paymentService = new PaymentService();

  async start() {
    console.log('Started Async Order Consumer Worker...');
    while (true) {
      try {
        const result = await redis.brpop('orders_queue', 0);
        if (result) {
          const [queue, message] = result;
          const payload = JSON.parse(message);
          await this.processOrder(payload);
        }
      } catch (err) {
        console.error('Worker error:', err);
      }
    }
  }

  async processOrder(data: any) {
    const { trackingId } = data;

    // Phase 6: Publish PROCESSING
    await redis.publish(
      `order_status:${trackingId}`,
      JSON.stringify({ status: 'PROCESSING', tracking_id: trackingId })
    );

    // Phase 5: Check if reservation expired in TTL (Saga Rollback condition)
    const reservation = await redis.get(`reservation:${trackingId}`);
    if (!reservation) {
      // Rollback stock if TTL naturally expired before worker could process
      await redis.incrby(
        `event:${data.eventId}:ticket:${data.ticketType}:stock`,
        data.quantity
      );
      await redis.publish(
        `order_status:${trackingId}`,
        JSON.stringify({ status: 'EXPIRED', tracking_id: trackingId })
      );
      return;
    }

    await this.ticketRepo.beginTransaction();
    try {
      const taxRate = 0.1;
      const price = 100;
      const subtotal = price * data.quantity;
      const totalTax = subtotal * taxRate;
      const totalAmount = subtotal + totalTax;

      const order = await this.orderRepo.createOrder({
        userId: data.userId,
        totalAmount,
        taxAmount: totalTax,
        status: 'PENDING',
      });

      const paymentSuccess = await this.paymentService.process(
        data.paymentToken,
        totalAmount
      );

      if (paymentSuccess) {
        await this.orderRepo.createPayment({
          orderId: order.id,
          amount: totalAmount,
          status: 'SUCCESS',
        });
        await this.orderRepo.updateOrderStatus(order.id, 'PAID');

        // Clear reservation since successfully paid
        await redis.del(`reservation:${trackingId}`);

        // Sync actual DB stock to match
        await this.ticketRepo.decrementStock(1, data.quantity);
        await this.ticketRepo.commitTransaction();

        // Phase 6: Publish CONFIRMED
        await redis.publish(
          `order_status:${trackingId}`,
          JSON.stringify({ status: 'CONFIRMED', tracking_id: trackingId })
        );
      } else {
        throw new Error('Payment Failed');
      }
    } catch (err: any) {
      await this.ticketRepo.rollbackTransaction();

      // Phase 5: Saga Rollback
      await redis.incrby(
        `event:${data.eventId}:ticket:${data.ticketType}:stock`,
        data.quantity
      );
      await redis.del(`reservation:${trackingId}`);

      // Phase 6: Publish FAILED
      await redis.publish(
        `order_status:${trackingId}`,
        JSON.stringify({
          status: 'FAILED',
          tracking_id: trackingId,
          error: err.message,
        })
      );
    }
  }
}
