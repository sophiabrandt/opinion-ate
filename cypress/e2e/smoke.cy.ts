describe('template spec', () => {
  it('can view the homepage', () => {
    cy.visit('/');
    cy.contains('Hello, world!');
  });
});
