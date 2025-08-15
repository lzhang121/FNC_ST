import http from 'k6/http';
import { check, sleep } from 'k6';
import { postTrend, postSuccess } from '../../metrics/customMetrics.js';

const env = JSON.parse(open('../../config/env.json'));
const urls = JSON.parse(open('../../data/urls.json'));
const payloads = JSON.parse(open('../../data/payloads.json'));

export function scenarioPost() {
  const payload = {
    'refreshToken': '9e8f06b3ba1f4cdabd3c84b7436b2591',
  };

  const res = http.post(`${env.baseURL}${urls.auth_auth_refresh_token}`, payload);

  const ok = check(res, {
    '状态码 201': (r) => r.status === 201
  });

  postTrend.add(res.timings.duration);
  postSuccess.add(ok);

  sleep(1);
}
