import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.waitForLoadState('networkidle');
  
  await expect(page.getByText('Popular productsBeats')).toBeVisible();
  await page.getByRole('img', { name: 'Beats Headphone' }).click();
  await expect(page.locator('div').filter({ hasText: 'Beats Headphone(4.5)Brand new' }).first()).toBeVisible();
  await page.locator('div').filter({ hasText: /^Add to CartBuy now$/ }).getByRole('button').nth(1).click();
  await expect(page.locator('div').filter({ hasText: 'Your Cart1 ItemsProduct' }).first()).toBeVisible();
  await page.getByRole('button', { name: 'Place Order' }).click();
  await expect(page.getByText('⚠️Please login to place order')).toBeVisible();
  await expect(page.getByText('HomeShopAboutAccountAccount')).toBeVisible();
  await page.getByRole('img', { name: 'logo' }).click();
});