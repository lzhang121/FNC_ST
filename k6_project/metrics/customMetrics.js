import { Trend, Rate } from 'k6/metrics';

// POST 请求指标
export const postTrend = new Trend('post_data_time');
export const postSuccess = new Rate('post_data_success');

// 如果有更多场景，也可以新增 Trend / Rate / Counter
