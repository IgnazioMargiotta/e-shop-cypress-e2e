import { Chance } from 'chance'

const chance = new Chance();

describe('empty spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })
  
  it('should check if the title and products exist', () => {
    cy.findByText(/Title PhotoSì/i).should('exist')
    cy.findAllByTestId('product-component').should('have.length', 3)
  });
  
  it('should click to the new product button and use it and check the submission', () => {
    cy.findByRole('button', {name: 'Create a new product'}).click();
    cy.findByText('New product');

    const productName = chance.word({ length: 5 })
    cy.findByLabelText('Product name').should('exist').type(productName);
    cy.findByRole('button', {name: 'Create new product'}).click();
    cy.findAllByTestId('product-component').should('have.length', 4)
  });
  
})