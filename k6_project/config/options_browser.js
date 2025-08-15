export const options = {
  scenarios: {
    ui: {
      executor: 'shared-iterations',
      vus: 5,
      iterations: 20,
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
  thresholds: {
    checks: ['rate==1.0'],
  },
};