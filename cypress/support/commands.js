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
  return cy.get('nav');
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

// Custom command to click navigation link
Cypress.Commands.add('clickNavLink', (linkName) => {
  cy.getNavbar().contains(linkName).click();
});

// Custom command to verify current URL
Cypress.Commands.add('shouldBeOnPage', (path) => {
  cy.url().should('include', path);
});

// Custom command to wait for page load
Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('nav').should('be.visible');
});

// Override visit command to wait for page load
Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
  return originalFn(url, options).then(() => {
    cy.waitForPageLoad();
  });
});
