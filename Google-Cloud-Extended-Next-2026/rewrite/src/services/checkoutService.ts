import { TicketRepository } from '../repositories/ticketRepository';
import { OrderRepository } from '../repositories/orderRepository';
import { PaymentService } from './paymentService';

export class CheckoutService {
  async processCheckout(userId: number, data: any) {
    const ticketRepo = new TicketRepository();
    const orderRepo = new OrderRepository();
    const paymentService = new PaymentService();

    await ticketRepo.beginTransaction();

    try {
      const event = await ticketRepo.getEvent(data.eventId);
      if (!event) {
        const err: any = new Error('Event not found');
        err.statusCode = 404;
        throw err;
      }

      const ticket = await ticketRepo.getTicketForUpdate(
        data.eventId,
        data.ticketType
      );
      if (!ticket) {
        const err: any = new Error('Ticket type not found for this event');
        err.statusCode = 404;
        throw err;
      }

      if (ticket.stock_available < data.quantity) {
        const err: any = new Error('Not enough tickets available');
        err.statusCode = 400;
        throw err;
      }

      await ticketRepo.decrementStock(ticket.id, data.quantity);

      const taxRate = event.name === 'Charity Concert' ? 0.05 : 0.1;
      const subtotal = ticket.price * data.quantity;
      const totalTax = subtotal * taxRate;
      const totalAmount = subtotal + totalTax;

      const order = await orderRepo.createOrder({
        userId,
        totalAmount,
        taxAmount: totalTax,
        status: 'PENDING',
      });

      const paymentSuccess = await paymentService.process(
        data.paymentToken,
        totalAmount
      );
      if (!paymentSuccess) {
        const err: any = new Error('Payment failed');
        err.statusCode = 400;
        throw err;
      }

      await orderRepo.createPayment({
        orderId: order.id,
        amount: totalAmount,
        status: 'SUCCESS',
      });

      await orderRepo.updateOrderStatus(order.id, 'PAID');

      await ticketRepo.commitTransaction();

      return {
        status: 'success',
        message: 'Order completed successfully',
        data: {
          order_id: order.id,
          total_amount: totalAmount,
          status: 'PAID',
          tickets: {
            event: event.name,
            type: data.ticketType,
            quantity: data.quantity,
          },
        },
      };
    } catch (error) {
      await ticketRepo.rollbackTransaction();
      throw error;
    }
  }
}
