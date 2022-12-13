describe('empty spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/product/1')
  })
  
  it('should check if the title', () => {
    cy.findByText(/Test PhotoSì/i).should('exist')
  });
  
  it('should check the title of the product', () => {
    cy.findByText(/product 1/i).should('exist')
  });

  it('should click to the new product button and use it and check the submission', () => {
    cy.findByRole('button', {name: 'Edit product'}).click();

    cy.findByLabelText('Product name').should('exist').clear().type('new title');
    cy.findByRole('button', {name: 'Edit product'}).click();
    cy.findByText(/new title/i).should('exist')
  });
  
})