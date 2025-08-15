import { browser } from 'k6/browser';
import { check } from 'k6';

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



export default async function loadhomePage () {
  const page = await browser.newPage();

  try {
    await page.goto('http://test01.fncjob.com/');

    // Enter login credentials
    await page.locator('input[placeholder="\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9"]').type('admin');
    await page.locator('input[placeholder="\u30d1\u30b9\u30ef\u30fc\u30c9"]').type('admin123');
    await page.locator('.el-button.el-button--primary.is-round').click();

    await page.waitForLoadState('networkidle');  

    await page.locator('.management_end_title').waitFor({ timeout: 10000 });


    await page.screenshot({ path: 'screenshots/screenshot.png' });
  } finally {
    await page.close();
  }
}