import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

const RESERVE_SCRIPT = `
local stock_key = KEYS[1]
local quantity = tonumber(ARGV[1])
local current_stock = tonumber(redis.call('get', stock_key) or '0')

if current_stock >= quantity then
    redis.call('decrby', stock_key, quantity)
    return 1
else
    return 0
end
`;

redis.defineCommand('reserveStock', {
  numberOfKeys: 1,
  lua: RESERVE_SCRIPT,
});

export class RedisCheckoutService {
  async processCheckout(userId: number, data: any) {
    const stockKey = `event:${data.eventId}:ticket:${data.ticketType}:stock`;

    // @ts-expect-error - reserveStock is a custom lua script command not defined in standard redis types
    const reserved = await redis.reserveStock(stockKey, data.quantity);

    if (reserved === 0) {
      const err: any = new Error('Sold out or not enough tickets');
      err.statusCode = 400;
      throw err;
    }

    const trackingId = `ord_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    // Phase 5: TTL for temporary reservation state (5 minutes)
    await redis.set(
      `reservation:${trackingId}`,
      JSON.stringify(data),
      'EX',
      300
    );

    const payload = {
      trackingId,
      userId,
      eventId: data.eventId,
      ticketType: data.ticketType,
      quantity: data.quantity,
      paymentToken: data.paymentToken,
      timestamp: Date.now(),
    };

    await redis.lpush('orders_queue', JSON.stringify(payload));

    // Phase 6: Publish initial state
    await redis.publish(
      `order_status:${trackingId}`,
      JSON.stringify({ status: 'PENDING', tracking_id: trackingId })
    );

    return {
      status: 'accepted',
      message: 'Reservation successful. Order is processing.',
      tracking_id: trackingId,
    };
  }
}
