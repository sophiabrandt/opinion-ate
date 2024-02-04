describe('Listing Restaurants', () => {
  it('shows restaurants from the server', () => {
    const sushiPlace = {id: 'sushi-place', name: 'Sushi Place'};
    const pizzaPlace = {id: 'pizza-place', name: 'Pizza Place'};

    cy.intercept('GET', 'https://api.outsidein.dev/*/restaurants', [
      sushiPlace,
      pizzaPlace,
    ]);

    cy.visit('/');
    cy.contains('Sushi Place');
    cy.contains('Pizza Place');
  });
});
