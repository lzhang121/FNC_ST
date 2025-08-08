// scenarios/getData.js

import http from 'k6/http';
import { check, sleep } from 'k6';
import { getTrend, getSuccess } from '../metrics/customMetrics.js';
//import { open } from 'k6/io';

const env = JSON.parse(open('../config/env.json'));
const urls = JSON.parse(open('../data/urls.json'));
export function scenarioGet() {
  const res = http.get(`${env.baseURL}${urls.getData}`);

  const ok = check(res, {
    '状态码 200': (r) => r.status === 200,
    '响应包含 userId 字段': (r) => r.body.includes('userId')
  });

  getTrend.add(res.timings.duration);
  getSuccess.add(ok);

  sleep(1);
}
