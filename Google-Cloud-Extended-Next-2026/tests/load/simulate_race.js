/* eslint-disable */
const { isMainThread } = require('worker_threads');
const { performance } = require('perf_hooks');

class SimulatedDB {
  constructor() {
    this.stock = 20;
    this.successfulOrders = 0;
    this.failedOrders = 0;
    this.isLocked = false;
    this.lockQueue = [];
  }

  async delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async acquireLock() {
    if (!this.isLocked) {
      this.isLocked = true;
      return;
    }
    return new Promise((resolve) => this.lockQueue.push(resolve));
  }

  releaseLock() {
    if (this.lockQueue.length > 0) this.lockQueue.shift()();
    else this.isLocked = false;
  }

  async processBackgroundOrder(isFailure = false, redisObj = null) {
    await this.acquireLock();
    try {
      await this.delay(25); // Processing time
      if (isFailure) {
        this.failedOrders += 1;
        // Phase 5: Saga Rollback in Redis!
        redisObj.stock += 1;
        redisObj.publish('FAILED');
      } else {
        this.successfulOrders += 1;
        redisObj.publish('CONFIRMED');
      }
    } finally {
      this.releaseLock();
    }
  }
}

class SimulatedRedis {
  constructor() {
    this.stock = 20;
    this.messages = [];
  }
  reserve(quantity) {
    if (this.stock >= quantity) {
      this.stock -= quantity;
      return 1;
    }
    return 0;
  }
  publish(status) {
    this.messages.push(status);
  }
}

async function runPhase5SagaRollbackTest(totalRequests) {
  console.log(`\n====================================================`);
  console.log(`⚡ PHASE 5 & 6: SAGA AUTO-ROLLBACK & SSE PUB/SUB TEST`);
  console.log(
    `- Scenario: 20 VIP Tickets, 100 VUs. BUT 5 VUs have invalid credit cards (Payment Failures).`
  );
  console.log(
    `- Expected: 100 VUs hit Redis. 20 Accepted. Background worker fails 5 orders, emits SSE FAILED events, and rolls back 5 tickets into Redis stock. The next 5 VUs in the queue successfully claim the rolled-back tickets!`
  );
  console.log(`====================================================\n`);

  const db = new SimulatedDB();
  const redis = new SimulatedRedis();
  const queue = [];

  // Part 1: 100 users try to reserve
  const start = performance.now();
  for (let i = 0; i < totalRequests; i++) {
    const reserved = redis.reserve(1);
    if (reserved === 1) {
      // Simulate that the first 5 specific users will fail payment
      const willFailPayment = queue.length < 5;
      queue.push({ id: i, willFailPayment });
    }
  }
  const end = performance.now();

  console.log(
    `[Redis] Initial reservation phase took ${(end - start).toFixed(2)} ms`
  );
  console.log(
    `[Redis] Stock left: ${redis.stock}. Enqueued ${queue.length} orders.`
  );

  // Part 2: Worker processes orders and hits payment failures
  console.log(`\n[Worker] Processing orders...`);
  for (const job of queue) {
    await db.processBackgroundOrder(job.willFailPayment, redis);
  }

  console.log(`[Worker] Finished processing.`);
  console.log(`         DB Successful Orders: ${db.successfulOrders}`);
  console.log(`         DB Failed Orders: ${db.failedOrders}`);

  console.log(
    `\n[Phase 6 SSE] Real-time Pub/Sub events emitted to clients: \n[ ${redis.messages.join(', ')} ]`
  );

  console.log(
    `\n[Phase 5 Saga] Stock automatically rolled back and is available: ${redis.stock}`
  );

  // Part 3: The 5 tickets are back! 5 more VUs try to buy them.
  console.log(
    `\n[Phase 5 Saga] 5 new users notice tickets are available again and try to checkout...`
  );
  let newClaims = 0;
  for (let i = 0; i < 5; i++) {
    if (redis.reserve(1) === 1) newClaims++;
  }

  console.log(`[Redis] New users successfully reserved: ${newClaims} tickets!`);
  console.log(`[Redis] Final Stock: ${redis.stock}`);

  if (newClaims === 5 && redis.stock === 0) {
    console.log(
      `\n✅ VERDICT: SAGA AUTO-ROLLBACK & SSE PASSED! Stock integrity perfectly maintained across asynchronous failures.`
    );
  } else {
    console.log(
      `\n❌ VERDICT: SAGA AUTO-ROLLBACK FAILED! Stock leak detected.`
    );
  }
}

async function main() {
  await runPhase5SagaRollbackTest(100);
}

if (isMainThread) {
  main();
}
