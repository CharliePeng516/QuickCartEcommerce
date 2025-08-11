# QuickCart Cypress Test Suite

This directory contains end-to-end tests for the QuickCart e-commerce application using Cypress.

## Test Files Overview

### `e2e/navigation.cy.js`
Comprehensive navigation tests that cover:
- Navbar display and logo visibility
- Navigation links (Home, Shop, About)
- Logo click navigation from different pages
- Search icon visibility
- Full navigation flow testing
- Responsive design testing
- Cross-page navigation verification

## Custom Commands

The test suite includes custom Cypress commands in `support/commands.js`:

- `cy.getNavbar()` - Get the navbar element
- `cy.visitHome()` - Navigate to home page
- `cy.visitAllProducts()` - Navigate to all products page
- `cy.visitCart()` - Navigate to cart page
- `cy.visitAbout()` - Navigate to about page
- `cy.clickLogo()` - Click the logo
- `cy.clickNavLink(linkName)` - Click a navigation link
- `cy.shouldBeOnPage(path)` - Verify current URL
- `cy.waitForPageLoad()` - Wait for page to load

## Running the Tests

### Prerequisites
1. Make sure your QuickCart app is running on `http://localhost:3000`
2. Cypress is already installed as a dev dependency

### Running Tests in Open Mode (Interactive)
```bash
npm run cypress:open
```

### Running Tests in Headless Mode
```bash
npm run cypress:run
```

### Running Only Navigation Tests
```bash
npm run test:cypress
```

### Running Tests with Auto Server Start
```bash
npm run test:e2e
```

### Running Specific Test File
```bash
npx cypress run --spec "cypress/e2e/navigation.cy.js"
```

## Test Configuration

The tests are configured in `cypress.config.js` with:
- Base URL: `http://localhost:3000`
- Viewport: 1280x720 (desktop)
- Video recording: disabled
- Screenshots on failure: enabled
- Command timeout: 10 seconds

## Test Structure

Each test follows this pattern:
1. **Setup**: Navigate to the page under test
2. **Action**: Perform user interactions using custom commands
3. **Assertion**: Verify expected outcomes

## Key Features Tested

- ✅ Navigation and routing
- ✅ Logo click functionality
- ✅ Navigation link functionality
- ✅ Cross-page navigation
- ✅ Responsive design
- ✅ Navbar visibility across pages
- ✅ Search icon presence

## Advantages of Cypress Tests

Compared to Playwright, Cypress offers:
- **Interactive Test Runner**: Visual interface for debugging
- **Real-time Reload**: See changes as you write tests
- **Time Travel**: Step through test execution
- **Automatic Waiting**: Built-in retry and wait mechanisms
- **Network Stubbing**: Easy API mocking
- **Visual Testing**: Built-in screenshot and video capabilities

## Test Examples

### Basic Navigation Test
```javascript
it('should navigate to all products page', () => {
  cy.clickNavLink('Shop');
  cy.shouldBeOnPage('/all-products');
  cy.contains('All products').should('be.visible');
});
```

### Logo Navigation Test
```javascript
it('should navigate to home page when logo is clicked', () => {
  cy.visitAllProducts();
  cy.clickLogo();
  cy.shouldBeOnPage('/');
});
```

### Responsive Test
```javascript
it('should have responsive navigation elements', () => {
  cy.viewport(375, 667); // Mobile viewport
  cy.getNavbar().should('be.visible');
  cy.getNavbar().find('img[alt="logo"]').should('be.visible');
});
```

## Troubleshooting

If tests fail:
1. Ensure your app is running: `npm run dev`
2. Check that the app is accessible at `http://localhost:3000`
3. Run tests in open mode to see what's happening: `npm run cypress:open`
4. Check the Cypress command log for detailed error information
5. Verify that all required elements are present in the DOM

## Comparison with Playwright

Both test suites cover similar functionality but with different approaches:

| Feature | Cypress | Playwright |
|---------|---------|------------|
| Test Runner | Interactive GUI | Headless/headed |
| Browser Support | Chrome, Firefox, Edge | Chrome, Firefox, Safari |
| Network Control | Built-in stubbing | Advanced API mocking |
| Visual Testing | Screenshots/videos | Screenshots/videos |
| Mobile Testing | Viewport simulation | Real mobile browsers |
| Performance | Good for E2E | Excellent for complex scenarios |

## Next Steps

To expand the test suite, consider adding:
- Product browsing tests
- Cart functionality tests
- User authentication tests
- Form validation tests
- API integration tests
- Performance tests
