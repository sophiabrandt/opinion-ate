import {render} from '@testing-library/react';
import RestaurantList from './RestaurantList';

describe('RestaurantList', () => {
  it('loads a list of restaurants on first render', () => {
    const loadRestaurants = vi.fn().mockName('loadRestaurants');

    render(<RestaurantList loadRestaurants={loadRestaurants} />);

    expect(loadRestaurants).toHaveBeenCalled();
  });
});
