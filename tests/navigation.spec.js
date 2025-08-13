import { test, expect } from '@playwright/test';

test.describe('Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page before each test
    await page.goto('http://localhost:3000');
  });

  test('should display navbar with logo and navigation links', async ({ page }) => {
    const nav = page.locator('nav');
    
    // Check if navbar is visible
    await expect(nav).toBeVisible();
    
    // Check if logo is visible within navbar
    await expect(nav.locator('img[alt="logo"]')).toBeVisible();
    
    // Check if main navigation links are visible within navbar
    await expect(nav.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Shop' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'About' })).toBeVisible();
  });

  test('should navigate to home page when logo is clicked', async ({ page }) => {
    const nav = page.locator('nav');
    
    // Navigate to a different page first
    await page.goto('http://localhost:3000/all-products');
    
    // Click on the logo within navbar
    await nav.locator('img[alt="logo"]').click();
    
    // Should navigate to home page
    await expect(page).toHaveURL('http://localhost:3000/');
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
    await expect(page).toHaveURL(/\/all-products$/);
  
    // Assert page content
    await expect(page.locator('p', { hasText: /^All products$/i })).toBeVisible();
  });

  test('should navigate to about page', async ({ page }) => {
    const nav = page.getByRole('navigation');
    
    await expect(nav).toBeVisible();
    
    // Click on About link within navbar
    const aboutLink = nav.getByRole('link', { name: 'About' })
    await expect(aboutLink).toBeVisible();
    await expect(aboutLink).toBeEnabled();

    await page.waitForLoadState('networkidle');
    await Promise.all([
      page.waitForURL(/\/about(?:\/|\?.*)?$/, { timeout: 15000 }),
      aboutLink.click(),
    ]);
    // Should navigate to about page
    await expect(page).toHaveURL(/\/about$/);
  });


  test('should display search icon in navbar', async ({ page }) => {
    const nav = page.locator('nav');
    
    // Check if search icon is visible within navbar
    await expect(nav.locator('img[alt="search icon"]')).toBeVisible();
  });
});
