import {render, screen} from '@testing-library/react';
import {RestaurantList, RestaurantListProps} from './RestaurantList';

describe('RestaurantList', () => {
  it('loads a list of restaurants on first render', () => {
    const {
      props: {loadRestaurants},
    } = setup();

    expect(loadRestaurants).toHaveBeenCalled();
  });

  describe('when loading succeeds', () => {
    it('displays the restaurants', () => {
      setup();

      expect(screen.getByText('Sushi Place')).toBeInTheDocument();
    });

    it('does not display a loading indicator', () => {
      setup();

      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });
  });

  it('displays a loading indicator while loading', () => {
    setup({loading: true});

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  function setup(propOverrides: Partial<RestaurantListProps> = {}) {
    const props: RestaurantListProps = {
      loadRestaurants: vi.fn().mockName('loadRestaurants'),
      restaurants: [
        {id: 1, name: 'Sushi Place'},
        {id: 2, name: 'Pizza Place'},
      ],
      loading: false,
      ...propOverrides,
    };

    render(<RestaurantList {...props} />);

    return {props};
  }
});
