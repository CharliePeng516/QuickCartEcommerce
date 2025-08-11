// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom command to get navbar element
Cypress.Commands.add('getNavbar', () => {
  cy.get('nav');
});

// Custom command to navigate to home page
Cypress.Commands.add('visitHome', () => {
  cy.visit('/');
});

// Custom command to navigate to all products page
Cypress.Commands.add('visitAllProducts', () => {
  cy.visit('/all-products');
});

// Custom command to navigate to cart page
Cypress.Commands.add('visitCart', () => {
  cy.visit('/cart');
});

// Custom command to navigate to about page
Cypress.Commands.add('visitAbout', () => {
  cy.visit('/about');
});

// Custom command to click logo
Cypress.Commands.add('clickLogo', () => {
  cy.getNavbar().find('img[alt="logo"]').click();
});

Cypress.Commands.add('clickNavLink', (linkName) => {
  cy.log(`Clicking nav link: ${linkName}`);

  // 如果是移动端，先点开汉堡菜单
  cy.get('body').then($body => {
    const isHidden = $body.find('nav').find(`a:contains(${linkName})`).length === 0;
    if (isHidden) {
      cy.log('Detected mobile menu, opening hamburger menu');
      cy.get('[data-testid="menu-button"]').click();
    }
  });

  cy.getNavbar()
    .contains(linkName)
    .should('be.visible')
    .click({ force: true });
});

Cypress.Commands.add('shouldBeOnPage', (path) => {
  cy.url({ timeout: 20000 }).should('include', path);
});

// Custom command to wait for page load
Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('nav').should('be.visible');
});

// Override visit command to wait for page load
Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
  originalFn(url, options);
  cy.waitForPageLoad();
});

