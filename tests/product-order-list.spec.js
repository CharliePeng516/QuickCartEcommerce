import { test, expect } from '@playwright/test';

test('e2e: browse product and place order requires login', async ({
  page,
}) => {
  await page.goto('/', {
    waitUntil: 'domcontentloaded',
    timeout: 60_000,
  });

  const beatsCardImg = page.getByRole('img', {
    name: /beats headphone/i,
  });
  await expect(beatsCardImg).toBeVisible();

  await Promise.all([
    page.waitForURL(
      /\/product\/[^/?#]+(?:\?.*)?$/,
      {
        waitUntil: 'domcontentloaded',
        timeout: 15000,
      }
    ),
    beatsCardImg.click(),
  ]);

  const detail = page
    .locator('div.flex.flex-col')
    .filter({
      has: page.getByRole('heading', {
        level: 1,
        name: /beats headphone/i,
      }),
    })
    .first();

  await expect(detail).toBeVisible({
    timeout: 15_000,
  });

  const buyNow = detail.getByRole('button', {
    name: /^buy now$/i,
  });
  await expect(buyNow).toBeVisible({
    timeout: 15_000,
  });
  await buyNow.scrollIntoViewIfNeeded();
  await buyNow.click();

  await expect(
    page.getByText(/your cart/i)
  ).toBeVisible();
  await page
    .getByRole('button', { name: /place order/i })
    .click();
  await expect(
    page.getByText(/please login to place order/i)
  ).toBeVisible({ timeout: 10000 });
});
