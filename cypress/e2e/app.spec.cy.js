describe('Navigation', () => {
  it('should navigate to pageone', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')

    // Find a link with an href attribute containing "about" and click it
    cy.get('a[href*="pageone"]').click()

    // The new url should include "/pageone"
    cy.url().should('include', '/pageone')

    // The new page should contain an h1 with "Page One"
    cy.get('h1').contains('Page One')
  })
})
