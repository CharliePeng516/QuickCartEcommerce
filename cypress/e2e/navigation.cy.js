describe('Navigation Tests', () => {
  beforeEach(() => {
    // Navigate to the home page before each test
    cy.visitHome();
  });

  it('should display navbar with logo and navigation links', () => {
    // Get the navbar element
    const nav = cy.getNavbar();
    
    // Check if navbar is visible
    nav.should('be.visible');
    
    // Check if logo is visible within navbar
    nav.find('img[alt="logo"]').should('be.visible');
    
    // Check if main navigation links are visible within navbar
    nav.contains('Home').should('be.visible');
    nav.contains('Shop').should('be.visible');
    nav.contains('About').should('be.visible');
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

  it('should complete full navigation flow', () => {
    // Start at home page
    cy.visitHome();
    
    // Navigate to all products
    cy.clickNavLink('Shop');
    cy.shouldBeOnPage('/all-products');
    
    // Navigate to about page
    cy.clickNavLink('About');
    cy.shouldBeOnPage('/about');
    
    // Navigate back to home
    cy.clickNavLink('Home');
    cy.shouldBeOnPage('/');
    
    // Click logo to go home again
    cy.clickLogo();
    cy.shouldBeOnPage('/');
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

  it('should maintain navbar visibility across page navigation', () => {
    // Verify navbar is visible on home page
    cy.getNavbar().should('be.visible');
    
    // Navigate to all products and verify navbar is still visible
    cy.clickNavLink('Shop');
    cy.getNavbar().should('be.visible');
    
    // Navigate to about page and verify navbar is still visible
    cy.clickNavLink('About');
    cy.getNavbar().should('be.visible');
    
    // Navigate back to home and verify navbar is still visible
    cy.clickNavLink('Home');
    cy.getNavbar().should('be.visible');
  });

  it('should have responsive navigation elements', () => {
    // Test on desktop viewport
    cy.viewport(1280, 720);
    cy.getNavbar().should('be.visible');
    cy.getNavbar().contains('Home').should('be.visible');
    cy.getNavbar().contains('Shop').should('be.visible');
    cy.getNavbar().contains('About').should('be.visible');
    
    // Test on mobile viewport
    cy.viewport(375, 667);
    cy.getNavbar().should('be.visible');
    // Mobile navigation elements should still be present
    cy.getNavbar().find('img[alt="logo"]').should('be.visible');
  });
});
