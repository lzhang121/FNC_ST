import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend, Rate } from 'k6/metrics';
import urls from '../data/urls.json';

const getTrend = new Trend('get_data_time');
const getSuccess = new Rate('get_data_success');

export function scenarioGet() {
  const res = http.get(urls.getData);
  const ok = check(res, { 'ó?? 200': (r) => r.status === 200 });
  getTrend.add(res.timings.duration);
  getSuccess.add(ok);
  sleep(1);
}
