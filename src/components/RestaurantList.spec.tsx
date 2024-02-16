import {render, screen} from '@testing-library/react';
import {RestaurantList, connector} from './RestaurantList';
import {ConnectedProps} from 'react-redux';

describe('RestaurantList', () => {
  it('loads a list of restaurants on first render', () => {
    const {
      props: {loadRestaurants},
    } = setup();

    expect(loadRestaurants).toHaveBeenCalled();
  });

  describe('when loading', () => {
    it('displays a loading indicator', () => {
      setup({loading: true});

      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
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

    it('does not display an error message', () => {
      setup();

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });

  describe('when loading fails', () => {
    it('shows an error message', () => {
      setup({restaurants: [], showErrorMessage: true});

      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  function setup(propOverrides: Partial<unknown> = {}) {
    const props = {
      loadRestaurants: vi.fn().mockName('loadRestaurants'),
      restaurants: [
        {id: 1, name: 'Sushi Place'},
        {id: 2, name: 'Pizza Place'},
      ],
      loading: false,
      showErrorMessage: false,
      ...propOverrides,
    } as unknown as ConnectedProps<typeof connector>;

    render(<RestaurantList {...props} />);

    return {props};
  }
});
