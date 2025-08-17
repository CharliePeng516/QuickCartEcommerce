describe('Navigation Tests Comprehensive', () => {
  beforeEach(() => {
    cy.visit('/', { timeout: 60000 });
  });

  it('should display navbar with logo and navigation links', () => {
    cy.getNavbar().should('be.visible');
    
    cy.getNavbar().within(() => {
      cy.get('img[alt="logo"]').should('be.visible');
      cy.contains(/^home$/i).should('be.visible');
      cy.contains(/^shop$/i).or(cy.contains(/products/i)).should('be.visible');
      cy.contains(/^about$/i).should('be.visible');
    });
  });

  it('should navigate to home page when logo is clicked', () => {
    cy.visitAllProducts();
    
    cy.getNavbar().find('img[alt="logo"]').should('be.visible').click();
    
    cy.url({ timeout: 15000 }).should('match', /^(?:https?:\/\/[^/]+)?\/(?:\?.*)?$/);
  });

  it('should navigate to all products page', () => {
    cy.getNavbar().should('be.visible');
    
    cy.getNavbar().within(() => {
      cy.contains(/shop|products/i).should('be.visible').and('be.enabled').click();
    });

    cy.url({ timeout: 15000 }).should('match', /\/all-products(?:\/|\?.*)?$/);
    
    cy.contains(/all products/i).should('be.visible');
  });

  it('should navigate to about page', () => {
    cy.getNavbar().should('be.visible');

    cy.getNavbar().within(() => {
      cy.contains(/^about$/i).should('be.visible').and('be.enabled').click();
    });

    cy.url({ timeout: 15000 }).should('match', /\/about(?:\/|\?.*)?$/);
  });

  it('should display search icon in navbar', () => {
    cy.getNavbar().within(() => {
      cy.get('img[alt="search icon"], [data-testid="search-icon"], svg[aria-label="search"]')
        .should('be.visible');
    });
  });
});