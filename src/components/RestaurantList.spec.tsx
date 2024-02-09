import {render, screen} from '@testing-library/react';
import {RestaurantList} from './RestaurantList';
import {Restaurant} from '../store/restaurants/types';

describe('RestaurantList', () => {
  it('loads a list of restaurants on first render', () => {
    const {loadRestaurants} = setup();

    expect(loadRestaurants).toHaveBeenCalled();
  });

  it('displays the restaurants', () => {
    setup();

    expect(screen.getByText('Sushi Place')).toBeInTheDocument();
  });

  function setup() {
    const restaurants: Restaurant[] = [
      {id: 1, name: 'Sushi Place'},
      {id: 2, name: 'Pizza Place'},
    ];
    const loadRestaurants = vi.fn().mockName('loadRestaurants');

    render(
      <RestaurantList
        loadRestaurants={loadRestaurants}
        restaurants={restaurants}
      />,
    );

    return {loadRestaurants};
  }
});
