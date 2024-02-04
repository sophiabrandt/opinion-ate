import {render, screen} from '@testing-library/react';
import RestaurantList from './RestaurantList';
import {Restaurant} from './RestaurantScreen';

describe('RestaurantList', () => {
  it('loads a list of restaurants on first render', () => {
    const loadRestaurants = vi.fn().mockName('loadRestaurants');
    const restaurants: Restaurant[] = [];

    render(
      <RestaurantList
        loadRestaurants={loadRestaurants}
        restaurants={restaurants}
      />,
    );

    expect(loadRestaurants).toHaveBeenCalled();
  });

  it('displays the restaurants', () => {
    const noop = () => {};
    const restaurants = [
      {id: 1, name: 'Sushi Place'},
      {id: 2, name: 'Pizza Place'},
    ];

    render(<RestaurantList loadRestaurants={noop} restaurants={restaurants} />);

    expect(screen.getByText('Sushi Place')).toBeInTheDocument();
  });
});
