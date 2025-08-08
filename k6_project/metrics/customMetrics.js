import { Trend, Rate } from 'k6/metrics';

export const getTrend = new Trend('get_data_time');
export const getSuccess = new Rate('get_data_success');