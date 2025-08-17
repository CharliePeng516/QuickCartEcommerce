describe('All Products Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should navigate to all products page', () => {
    cy.getNavbar().within(() => {
      cy.contains('Shop').should('be.visible').and('be.enabled').click();
    });

    cy.shouldBeOnPage('/all-products');
    cy.url().should('match', /\/all-products(?:\/|\?.*)?$/);
  });
});