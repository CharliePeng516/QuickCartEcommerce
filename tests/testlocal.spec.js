// tests/ping-backend.spec.ts
import {
  test,
  expect,
  request,
} from '@playwright/test';

test('backend ping', async ({}) => {
  const api = await request.newContext({
    baseURL: 'http://localhost:3000',
  }); // 改成你的
  const res = await api.get('/'); // 改成你的健康检查/任意 GET
  const status = res.status();
  console.log('Status:', status);
  expect(res.ok()).toBeTruthy();
});
