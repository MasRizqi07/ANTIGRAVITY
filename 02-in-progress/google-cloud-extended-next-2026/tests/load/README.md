# High-Concurrency Load Testing

## Prerequisites

- Install [k6](https://k6.io/docs/get-started/installation/)
- PHP installed (for the integrity verification script)

## Setup Initial State

Before running a test, ensure the database is seeded with exactly 20 tickets. You can run this SQL:

```sql
UPDATE tickets SET stock_available = 20 WHERE event_id = 1 AND type = 'VIP';
DELETE FROM payments;
DELETE FROM orders;
```

## Running the Tests

### Target 1: Laravel Refactored Endpoint (Path A)

1. Start the Laravel server:
   ```bash
   php artisan serve --port=8000
   ```
2. Run k6 test:
   ```bash
   k6 run -e API_URL=http://localhost:8000/api/v1/checkout tests/load/ticket_concurrency_test.js
   ```
3. Run verification:
   ```bash
   php tests/load/verify_integrity.php
   ```

### Target 2: Node.js/TS Decoupled Endpoint (Path B)

1. Start the Node.js server:
   ```bash
   cd rewrite && npm run build && npm start
   ```
2. Run k6 test:
   ```bash
   k6 run -e API_URL=http://localhost:3000/api/v1/checkout tests/load/ticket_concurrency_test.js
   ```
3. Run verification:
   ```bash
   php tests/load/verify_integrity.php
   ```
