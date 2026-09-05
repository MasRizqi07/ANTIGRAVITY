/* eslint-disable */
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter } from 'k6/metrics';

export const options = {
  scenarios: {
    flash_sale: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '3s', target: 100 }, // Ramp up quickly to 100 VUs
        { duration: '10s', target: 100 }, // Hold for 10s to maximize contention
        { duration: '2s', target: 0 }, // Ramp down
      ],
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<500', 'p(99)<1000'],
  },
};

const successCounter = new Counter('successful_purchases');
const soldOutCounter = new Counter('sold_out_errors');
const serverErrorCounter = new Counter('server_errors');

export default function () {
  const targetUrl = __ENV.API_URL || 'http://localhost:8000/api/v1/checkout';

  // Randomizing user IDs to simulate different users hitting the system
  const randomUserId = Math.floor(Math.random() * 10000) + 1;

  const payload = JSON.stringify({
    event_id: 1,
    ticket_type: 'VIP',
    quantity: 1, // Buying 1 ticket at a time
    payment_token: 'tok_success',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer fake-token-${randomUserId}`,
    },
  };

  const res = http.post(targetUrl, payload, params);

  const isSuccess = check(res, {
    'status is 200 (Success)': (r) => r.status === 200,
  });

  if (isSuccess) {
    successCounter.add(1);
  } else {
    const isSoldOut = check(res, {
      'status is 400 (Sold out/Invalid)': (r) => r.status === 400,
    });

    if (isSoldOut) {
      soldOutCounter.add(1);
    } else {
      const isServerError = check(res, {
        'status is 500/504 (Error)': (r) => r.status >= 500,
      });
      if (isServerError) {
        serverErrorCounter.add(1);
      }
    }
  }

  // Very small sleep to allow rapid hammering without totally overwhelming the local network stack
  sleep(Math.random() * 0.1);
}
