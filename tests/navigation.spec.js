import { test, expect } from '@playwright/test';

const navLocator = (page) =>
  page.locator(
    'nav, header nav, [role="navigation"], [data-testid="navbar"]'
  );

test.describe('Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    // page.on('requestfailed', (r) =>
    //   console.log(
    //     'REQ FAILED:',
    //     r.method(),
    //     r.url(),
    //     r.failure()
    //   )
    // );
    await page.goto('/', {
      waitUntil: 'domcontentloaded',
      timeout: 60_000,
    });
  });

  test('should display navbar with logo and navigation links', async ({
    page,
  }) => {
    const nav = page.getByRole('navigation');
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
    const nav = page.getByRole('navigation');
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
