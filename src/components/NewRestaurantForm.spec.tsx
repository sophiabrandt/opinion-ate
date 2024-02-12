import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {NewRestaurantForm} from './NewRestaurantForm';

describe('NewRestaurantForm', () => {
  const restaurantName = 'Sushi Place';

  describe('when filled in', () => {
    it('calls createRestaurant with the restaurant name', async () => {
      const {createRestaurant} = await fillInForm();

      expect(createRestaurant).toHaveBeenCalledWith(restaurantName);
    });

    it('clears the form', async () => {
      await fillInForm();

      expect(
        screen.getByRole('textbox', {name: /restaurant name/i}),
      ).toHaveValue('');
    });
  });

  async function fillInForm() {
    const {createRestaurant} = setup();
    const user = userEvent.setup();
    await user.type(
      screen.getByRole('textbox', {name: /restaurant name/i}),
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
