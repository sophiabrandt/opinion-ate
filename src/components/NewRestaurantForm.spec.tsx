import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {NewRestaurantForm} from './NewRestaurantForm';

describe('NewRestaurantForm', () => {
  const restaurantName = 'Sushi Place';
  const requiredError = /restaurant name is required/i;

  describe('initially', () => {
    it('does not display a validation error', () => {
      setup();

      expect(screen.queryByText(requiredError)).not.toBeInTheDocument();
    });
  });

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

    it('does not display a validation error', async () => {
      await fillInForm();

      expect(screen.queryByText(requiredError)).not.toBeInTheDocument();
    });
  });

  describe('when empty', () => {
    it('displays a validation error', async () => {
      await submitEmptyForm();

      expect(screen.getByText(requiredError)).toBeInTheDocument();
    });

    it('does not call createRestaurant', async () => {
      const {createRestaurant} = await submitEmptyForm();

      expect(createRestaurant).not.toHaveBeenCalled();
    });
  });

  describe('when fixing a validation error', () => {
    it('clears the validation error', async () => {
      await fixValidationError();

      expect(screen.queryByText(requiredError)).not.toBeInTheDocument();
    });
  });

  async function fixValidationError() {
    const {createRestaurant, user} = setup();
    createRestaurant.mockResolvedValueOnce('');
    await user.click(screen.getByRole('button', {name: /add/i}));

    await user.type(
      screen.getByRole('textbox', {name: /restaurant name/i}),
      restaurantName,
    );
    await user.click(screen.getByRole('button', {name: /add/i}));
    return {createRestaurant, user};
  }
  async function submitEmptyForm() {
    const {createRestaurant, user} = setup();

    await user.click(screen.getByRole('button', {name: /add/i}));

    return {createRestaurant};
  }

  async function fillInForm() {
    const {createRestaurant, user} = setup();
    await user.type(
      screen.getByRole('textbox', {name: /restaurant name/i}),
      restaurantName,
    );
    await user.click(screen.getByRole('button', {name: /add/i}));
    return {createRestaurant, user};
  }

  function setup() {
    const user = userEvent.setup();
    const createRestaurant = vi.fn().mockName('createRestaurant');
    render(<NewRestaurantForm createRestaurant={createRestaurant} />);

    return {createRestaurant, user};
  }
});
