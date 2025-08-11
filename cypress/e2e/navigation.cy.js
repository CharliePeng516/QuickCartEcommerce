describe('Navigation Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });


  it('should display navbar with logo and navigation links', () => {
    cy.getNavbar().within(() => {
      cy.contains('Home').should('be.visible');
      cy.contains('Shop').should('be.visible');
      cy.contains('About').should('be.visible');
    });

  });

  it('should navigate to home page when logo is clicked', () => {
    // Navigate to a different page first
    cy.visitAllProducts();
    
    // Click on the logo within navbar
    cy.clickLogo();
    
    // Should navigate to home page
    cy.shouldBeOnPage('/');
  });

  it('should navigate to all products page', () => {
    // Click on Shop link within navbar
    cy.clickNavLink('Shop');
    
    // Should navigate to all products page
    cy.shouldBeOnPage('/all-products');
    
    // Check if the page title is correct
    cy.contains('All products').should('be.visible');
  });

  it('should navigate to about page', () => {
    // Click on About link within navbar
    cy.clickNavLink('About');
    
    // Should navigate to about page
    cy.shouldBeOnPage('/about');
  });

  it('should display search icon in navbar', () => {
    const nav = cy.getNavbar();
    
    // Check if search icon is visible within navbar
    nav.find('img[alt="search icon"]').should('be.visible');
  });

  it('should handle logo navigation from different pages', () => {
    // Test logo navigation from all products page
    cy.visitAllProducts();
    cy.clickLogo();
    cy.shouldBeOnPage('/');
    
    // Test logo navigation from about page
    cy.visitAbout();
    cy.clickLogo();
    cy.shouldBeOnPage('/');
    
    // Test logo navigation from cart page
    cy.visitCart();
    cy.clickLogo();
    cy.shouldBeOnPage('/');
  });

  it('should verify all navigation links work correctly', () => {
    // Test Home link
    cy.clickNavLink('Home');
    cy.shouldBeOnPage('/');
    
    // Test Shop link
    cy.clickNavLink('Shop');
    cy.shouldBeOnPage('/all-products');
    
    // Test About link
    cy.clickNavLink('About');
    cy.shouldBeOnPage('/about');
  });
});
