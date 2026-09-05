import express from 'express';
import { checkoutHandler } from './handlers/checkoutHandler';
import { getOrderHandler } from './handlers/getOrderHandler';
import { sseHandler } from './handlers/sseHandler';

const app = express();
app.use(express.json());

app.post('/api/v1/checkout', checkoutHandler);
app.get('/api/v1/orders/:id', getOrderHandler);
app.get('/api/v1/orders/:tracking_id/stream', sseHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Service running on port ${port}`);
});
