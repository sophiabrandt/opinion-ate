import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {NewRestaurantForm} from './NewRestaurantForm';

describe('NewRestaurantForm', () => {
  const restaurantName = 'Sushi Place';

  it('calls createRestaurant with the restaurant name', async () => {
    const {createRestaurant} = await fillInForm();

    expect(createRestaurant).toHaveBeenCalledWith(restaurantName);
  });

  async function fillInForm() {
    const {createRestaurant} = setup();
    const user = userEvent.setup();
    await user.type(
      screen.getByPlaceholderText('Add Restaurant'),
      restaurantName,
    );
    await user.click(screen.getByRole('button', {name: /add/i}));
    return {createRestaurant, user};
  }

  function setup() {
    const createRestaurant = vi.fn().mockName('createRestaurant');
    render(<NewRestaurantForm createRestaurant={createRestaurant} />);

    return {createRestaurant};
  }
});
