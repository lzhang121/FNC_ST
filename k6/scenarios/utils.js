// 随机生成用户 ID
export function randomUserId() {
  return Math.floor(Math.random() * 100000);
}

// 生成随机邮箱
export function randomEmail(domain = 'example.com') {
  return `user_${Math.floor(Math.random() * 10000)}@${domain}`;
}
