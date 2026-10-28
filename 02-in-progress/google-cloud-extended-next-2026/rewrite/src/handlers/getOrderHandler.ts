import { Request, Response } from 'express';
import { OrderRepository } from '../repositories/orderRepository';

export const getOrderHandler = async (req: Request, res: Response) => {
  try {
    const orderId = parseInt(req.params.id, 10);
    const repo = new OrderRepository();

    const orderData = await repo.getOrderWithRelations(orderId);

    if (!orderData) {
      return res.status(404).json({ error: 'Order not found' });
    }

    return res.status(200).json(orderData);
  } catch (error: any) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
