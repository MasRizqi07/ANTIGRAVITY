import { Request, Response } from 'express';
import Redis from 'ioredis';

const redisSubscriber = new Redis(
  process.env.REDIS_URL || 'redis://localhost:6379'
);

export const sseHandler = (req: Request, res: Response) => {
  const trackingId = req.params.tracking_id;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // Send initial connection heartbeat
  res.write('data: {"status": "CONNECTED"}\\n\\n');

  const channel = `order_status:${trackingId}`;

  const messageListener = (ch: string, message: string) => {
    if (ch === channel) {
      res.write(`data: ${message}\\n\\n`);

      const data = JSON.parse(message);
      if (['CONFIRMED', 'FAILED', 'EXPIRED'].includes(data.status)) {
        redisSubscriber.unsubscribe(channel);
        res.end();
      }
    }
  };

  redisSubscriber.subscribe(channel);
  redisSubscriber.on('message', messageListener);

  req.on('close', () => {
    redisSubscriber.unsubscribe(channel);
    redisSubscriber.removeListener('message', messageListener);
  });
};
