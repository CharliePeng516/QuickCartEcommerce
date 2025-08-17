describe('All Products Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should navigate to all products page', () => {
    cy.getNavbar().within(() => {
      cy.contains('a', /^Shop$/i)
        .should('be.visible')
        .and('have.attr', 'href', '/all-products')
        .scrollIntoView()
        .click();
    });

    cy.shouldBeOnPage('/all-products');
    cy.url().should(
      'match',
      /\/all-products(?:\/|\?.*)?$/
    );
  });
});
