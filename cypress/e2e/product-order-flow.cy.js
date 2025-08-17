describe('E2E Product Order Flow', () => {
  beforeEach(() => {
    cy.visit('/', { timeout: 60000 });
  });

  it('e2e: browse product and place order requires login', () => {
    cy.get('img[alt*="beats headphone" i]')
      .should('be.visible')
      .click();

    cy.url({ timeout: 15000 }).should('match', /\/product\/[^/?#]+(?:\?.*)?$/);

    cy.get('div.flex.flex-col')
      .contains('h1', /beats headphone/i)
      .should('be.visible', { timeout: 15000 })
      .parents('div.flex.flex-col')
      .first()
      .within(() => {
        cy.contains('button', /^buy now$/i)
          .should('be.visible', { timeout: 15000 })
          .scrollIntoView()
          .click();
      });

    cy.contains(/your cart/i).should('be.visible');
    
    cy.contains('button', /place order/i).click();
    
    cy.contains(/please login to place order/i).should('be.visible', { timeout: 10000 });
  });
});