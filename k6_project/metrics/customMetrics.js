import { Trend, Rate } from 'k6/metrics';

export const getTrend = new Trend('get_data_time');
export const getSuccess = new Rate('get_data_success');
export const postTrend = new Trend('post_data_time');
export const postSuccess = new Rate('post_data_success');