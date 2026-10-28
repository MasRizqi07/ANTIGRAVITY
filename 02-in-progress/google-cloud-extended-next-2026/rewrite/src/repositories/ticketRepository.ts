export class TicketRepository {
  async beginTransaction() {
    /* ... */
  }
  async commitTransaction() {
    /* ... */
  }
  async rollbackTransaction() {
    /* ... */
  }

  async getEvent(eventId: number) {
    return { id: eventId, name: 'Rock Concert' };
  }

  async getTicketForUpdate(eventId: number, type: string) {
    return { id: 1, event_id: eventId, type, price: 100, stock_available: 10 };
  }

  async decrementStock(ticketId: number, quantity: number) {}
}
