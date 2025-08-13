import { test, expect } from '@playwright/test';

test.describe('Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page before each test
    await page.goto('http://localhost:3000');
  });

  
  test('should navigate to all products page', async ({ page }) => {
    const nav = page.getByRole('navigation');
  
    // Ensure the navbar & link are truly ready
    await expect(nav).toBeVisible();
    const shop = nav.getByRole('link', { name: /shop/i });
    await expect(shop).toBeVisible();
    await expect(shop).toBeEnabled();
  
    // If your app hydrates/fetches on first load, this helps
    await page.waitForLoadState('networkidle');
  
    // Click and wait for navigation atomically
    await Promise.all([
      page.waitForURL(/\/all-products(?:\/|\?.*)?$/, { timeout: 15000 }),
      shop.click(),
    ]);
  
    // Optional: strict URL check after route settles
    await expect(page).toHaveURL(/\/all-products(?:\/|\?.*)?$/);
  
    // Assert page content
    await expect(page.locator('p', { hasText: /^All products$/i })).toBeVisible();
  });
  

});