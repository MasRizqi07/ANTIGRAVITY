export class PaymentService {
  async process(token: string, amount: number): Promise<boolean> {
    return token !== 'fail_me';
  }
}
