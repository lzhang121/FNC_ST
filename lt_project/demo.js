// demo.js
import puppeteer from 'puppeteer';
import lighthouse from 'lighthouse';
import fs from 'fs';
import { URL } from 'url';

(async () => {
  // 1. 启动 Puppeteer，并开启远程调试端口
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--remote-debugging-port=9222'] // Lighthouse 通过这个端口访问
  });
  const page = await browser.newPage();

  // 2. 打开登录页面
  await page.goto('http://test02.fncjob.com:48078/', { waitUntil: 'networkidle2' });

  // 3. 输入用户名和密码
  await page.type('#account', 'tester1');      // 根据页面修改选择器
  await page.type('#password', 'Spotwork123@!');

  // 4. 点击登录并等待跳转
  await page.click('#submit');                 // 根据页面修改选择器
  await page.waitForNavigation({ waitUntil: 'networkidle2' });
  console.log('登录成功');

  // 5. 获取 Puppeteer 的 cookies
  const cookies = await page.cookies();

  // 6. 启动 Lighthouse
  const options = {
    port: 9222,            // 与 Puppeteer remote debugging port 一致
    output: 'html',
    logLevel: 'info',
  };

  // 7. 创建一个 Lighthouse URL 对象，并设置 cookies
  const urlToAudit = page.url();
  const cookieHeader = cookies.map(c => `${c.name}=${c.value}`).join('; ');

  const runnerResult = await lighthouse(urlToAudit, {
    ...options,
    extraHeaders: { Cookie: cookieHeader } // 将登录 cookies 传给 Lighthouse
  });

  // 8. 保存 Lighthouse 报告
  fs.writeFileSync('lighthouse-report.html', runnerResult.report);
  console.log('Lighthouse 报告生成完成: lighthouse-report.html');

  // 9. 关闭浏览器
  await browser.close();
})();
