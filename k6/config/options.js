export const options = {
  vus: 10,         // 虚拟用户数
  duration: '60s', // 持续时间
  summaryTrendStats: ['avg', 'min', 'med', 'max', 'p(90)','p(95)', 'p(99)'], 
  thresholds: {
    http_req_duration: ['p(95)<600'],
    get_data_success: ['rate>0.95']
  }
};