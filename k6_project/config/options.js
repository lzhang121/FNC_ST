export const options = {
  vus: 100,         // 虚拟用户数
  duration: '180s', // 持续时间
  thresholds: {
    http_req_duration: ['p(95)<600'],
    get_data_success: ['rate>0.95']
  }
};