import http from 'k6/http';
import { check, sleep } from 'k6';
import { postTrend, postSuccess } from '../metrics/customMetrics.js';

const env = JSON.parse(open('../config/env.json'));
const urls = JSON.parse(open('../data/urls.json'));
const payloads = JSON.parse(open('../data/payloads.json'));

export function scenarioPost() {
  const payload = payloads
  const headers = {
    'Content-Type': 'application/json',
  };

  const res = http.post(`${env.baseURL}${urls.postData}`, payload, { headers });

  const ok = check(res, {
    '状态码 201': (r) => r.status === 201
  });

  postTrend.add(res.timings.duration);
  postSuccess.add(ok);

  sleep(1);
}
