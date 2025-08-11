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
    
    // Click on Shop link within navbar
    await nav.getByRole('link', { name: 'Shop' }).click();
    
    // Should navigate to all products page
    await expect(page).toHaveURL('http://localhost:3000/all-products');
    
    // Check if the page title is correct
    await expect(page.locator('text=All products')).toBeVisible();
  });

  test('should navigate to about page', async ({ page }) => {
    const nav = page.locator('nav');
    
    // Click on About link within navbar
    await nav.getByRole('link', { name: 'About' }).click();
    
    // Should navigate to about page
    await expect(page).toHaveURL('http://localhost:3000/about');
  });


  test('should display search icon in navbar', async ({ page }) => {
    const nav = page.locator('nav');
    
    // Check if search icon is visible within navbar
    await expect(nav.locator('img[alt="search icon"]')).toBeVisible();
  });
});
