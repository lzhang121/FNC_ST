import http from 'k6/http';
import { check, sleep } from 'k6';
import env from '../config/env.js';
import urls from '../data/urls.json';
import payloads from '../data/payloads.json';
import { postTrend, postSuccess } from '../metrics/customMetrics.js';
import { randomUserId } from './utils.js';

export function scenarioPost() {
  const payload = JSON.stringify({
    ...payloads.createUser,
    username: `user_${randomUserId()}`
  });

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${env.authToken}`
  };

  const res = http.post(`${env.baseURL}${urls.postData}`, payload, { headers });

  const ok = check(res, {
    '状态码 201': (r) => r.status === 201
  });

  postTrend.add(res.timings.duration);
  postSuccess.add(ok);

  sleep(1);
}
