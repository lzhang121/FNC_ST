export const options = {
  scenarios: {
    get_data: {
      executor: 'constant-vus',
      vus: 10,
      duration: '30s',
      exec: 'scenarioGet'
    },
    post_data: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '10s', target: 5 },
        { duration: '20s', target: 10 }
      ],
      exec: 'scenarioPost'
    }
  },
  thresholds: {
    http_req_duration: ['p(95)<500'],
    success_rate: ['rate>0.95']
  }
};
