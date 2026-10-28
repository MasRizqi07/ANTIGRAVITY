import { Request, Response } from 'express';
import { CheckoutService } from '../services/checkoutService';

export const checkoutHandler = async (req: Request, res: Response) => {
  try {
    const { event_id, ticket_type, quantity, payment_token } = req.body;

    // Basic validation
    if (!event_id)
      return res.status(400).json({ error: 'Event ID is required' });
    if (!ticket_type)
      return res.status(400).json({ error: 'Ticket type is required' });
    if (!quantity || quantity < 1)
      return res.status(400).json({ error: 'Valid quantity is required' });
    if (!payment_token)
      return res.status(400).json({ error: 'Payment token is required' });

    const userId = 1; // Mock user ID for Sandbox

    const service = new CheckoutService();
    const result = await service.processCheckout(userId, {
      eventId: event_id,
      ticketType: ticket_type,
      quantity: quantity,
      paymentToken: payment_token,
    });

    return res.status(200).json(result);
  } catch (error: any) {
    const statusCode = error.statusCode || 400;
    return res.status(statusCode).json({ error: error.message });
  }
};
