import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // page.on('requestfailed', (r) =>
    //   console.log(
    //     'REQ FAILED:',
    //     r.url(),
    //     r.failure()
    //   )
    // );
    await page.goto('/', {
      waitUntil: 'domcontentloaded',
      timeout: 60_000,
    });
  });

  test('should navigate to all products page', async ({
    page,
  }) => {
    const nav = page.getByRole('navigation');
    await expect(nav).toBeVisible();

    const shop = nav.getByRole('link', {
      name: /^shop$/i,
    });
    await expect(shop).toBeVisible();
    await expect(shop).toBeEnabled();

    await Promise.all([
      page.waitForURL(
        /\/all-products(?:\/|\?.*)?$/,
        { timeout: 15000 }
      ),
      shop.click(),
    ]);
    await expect(page).toHaveURL(
      /\/all-products(?:\/|\?.*)?$/
    );
  });
});
