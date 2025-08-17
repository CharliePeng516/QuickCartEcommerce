// cypress/e2e/navigation.cy.js
describe('Navigation Tests Comprehensive', () => {
  beforeEach(() => {
    cy.visit('/', { timeout: 60000 });
  });

  it('should display navbar with logo and navigation links', () => {
    cy.getNavbar().as('nav').should('be.visible');

    cy.get('@nav')
      .find('img[alt="logo"]')
      .should('be.visible');
    cy.get('@nav')
      .contains('a', /^home$/i)
      .should('be.visible');
    cy.get('@nav')
      .contains('a', /^(shop|products)$/i)
      .should('be.visible');
    cy.get('@nav')
      .contains('a', /^about$/i)
      .should('be.visible');
  });

  it('should navigate to all products page', () => {
    cy.getNavbar().as('nav').should('be.visible');

    cy.get('@nav')
      .contains('a', /^(shop|products)$/i)
      .should('be.visible')
      .and('have.attr', 'href', '/all-products')
      .click();

    cy.location('pathname', {
      timeout: 15000,
    }).should('eq', '/all-products');
    cy.contains(/all products/i).should(
      'be.visible'
    );
  });

  it('should navigate to about page', () => {
    cy.getNavbar().as('nav').should('be.visible');

    cy.get('@nav')
      .contains('a', /^about$/i)
      .should('be.visible')
      .and('have.attr', 'href', '/about')
      .click();

    cy.location('pathname', {
      timeout: 15000,
    }).should('eq', '/about');
  });

  it('should display search icon in navbar', () => {
    cy.getNavbar().within(() => {
      cy.get(
        'img[alt="search icon"], [data-testid="search-icon"], svg[aria-label="search"]'
      ).should('be.visible');
    });
  });
});
