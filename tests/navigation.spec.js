import { test, expect } from '@playwright/test';

const navLocator = (page) =>
  page.locator(
    'nav, header nav, [role="navigation"], [data-testid="navbar"]'
  );

test.describe('Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    // 打印失败请求，方便排查
    page.on('requestfailed', (r) =>
      console.log(
        'REQ FAILED:',
        r.method(),
        r.url(),
        r.failure()
      )
    );
    // 用相对路径 + domcontentloaded（更稳）
    await page.goto('/', {
      waitUntil: 'domcontentloaded',
      timeout: 60_000,
    });
  });

  test('should display navbar with logo and navigation links', async ({
    page,
  }) => {
    const nav = page.getByRole('navigation'); // 只在 <nav> 中找
    await expect(nav).toBeVisible();

    await expect(
      nav.locator(
        'img[alt="logo"], [data-testid="logo"]'
      )
    ).toBeVisible();

    await expect(
      nav.getByRole('link', { name: /^home$/i })
    ).toBeVisible();
    await expect(
      nav
        .getByRole('link', { name: /^shop$/i })
        .or(
          nav.getByRole('link', {
            name: /products/i,
          })
        )
    ).toBeVisible();
    await expect(
      nav.getByRole('link', { name: /^about$/i })
    ).toBeVisible();
  });

  test('should navigate to home page when logo is clicked', async ({
    page,
  }) => {
    const nav = navLocator(page);

    // 先到一个非首页的路由（相对路径）
    await page.goto('/all-products', {
      waitUntil: 'domcontentloaded',
    });

    // 点击 logo 并等待 URL 变化（原子等待）
    const logo = nav.locator(
      'a:has(img[alt="logo"]), img[alt="logo"]'
    );
    await expect(logo).toBeVisible();

    await Promise.all([
      page.waitForURL(
        /^(?:https?:\/\/[^/]+)?\/(?:\?.*)?$/,
        { timeout: 15000 }
      ), // 回首页
      logo.click(),
    ]);

    await expect(page).toHaveURL(
      /^(?:https?:\/\/[^/]+)?\/(?:\?.*)?$/
    );
  });

  test('should navigate to all products page', async ({
    page,
  }) => {
    const nav = navLocator(page);
    await expect(nav).toBeVisible();

    const shop = nav.getByRole('link', {
      name: /shop|products/i,
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
    // 断言页面内容（根据你的实际标题/文案调整）
    await expect(
      page
        .getByRole('heading', {
          name: /all products/i,
        })
        .or(
          page.locator('text=/^All products$/i')
        )
    ).toBeVisible();
  });

  test('should navigate to about page', async ({
    page,
  }) => {
    const nav = page.getByRole('navigation'); // 只在 <nav> 范围内查找
    await expect(nav).toBeVisible();

    const aboutLink = nav.getByRole('link', {
      name: /^about$/i,
    });
    await expect(aboutLink).toBeVisible();
    await expect(aboutLink).toBeEnabled();

    await Promise.all([
      page.waitForURL(/\/about(?:\/|\?.*)?$/, {
        timeout: 15000,
      }),
      aboutLink.click(),
    ]);
    await expect(page).toHaveURL(
      /\/about(?:\/|\?.*)?$/
    );
  });

  test('should display search icon in navbar', async ({
    page,
  }) => {
    const nav = navLocator(page);
    await expect(
      nav.locator(
        'img[alt="search icon"], [data-testid="search-icon"], svg[aria-label="search"]'
      )
    ).toBeVisible();
  });
});
