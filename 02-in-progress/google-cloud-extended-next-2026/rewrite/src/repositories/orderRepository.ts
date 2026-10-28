export class OrderRepository {
  async createOrder(data: any) {
    return { id: 1, ...data };
  }

  async createPayment(data: any) {}

  async updateOrderStatus(orderId: number, status: string) {}

  async getOrderWithRelations(orderId: number) {
    return {
      order: { id: orderId, total_amount: 105, status: 'PAID' },
      user: { id: 1, name: 'Test' },
      payments: [{ id: 1, amount: 105, status: 'SUCCESS' }],
    };
  }
}
