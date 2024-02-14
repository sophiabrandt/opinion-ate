import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {NewRestaurantForm} from './NewRestaurantForm';

describe('NewRestaurantForm', () => {
  const restaurantName = 'Sushi Place';
  const requiredError = /restaurant name is required/i;
  const serverError = /The restaurant could not be saved. Please try again./i;

  describe('initially', () => {
    it('does not display a validation error', () => {
      setup();

      expect(screen.queryByText(requiredError)).not.toBeInTheDocument();
    });

    it('does not display a server error', () => {
      setup();

      expect(screen.queryByText(serverError)).not.toBeInTheDocument();
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

    it('does not display a server error', async () => {
      await fillInForm();

      expect(screen.queryByText(serverError)).not.toBeInTheDocument();
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

  describe('when the store action rejects', () => {
    it.skip('displays a server error', async () => {
      await fillInFormWithServerError();

      expect(screen.getByText(serverError)).toBeInTheDocument();
    });

    it('does not clear the the form', async () => {
      await fillInFormWithServerError();

      expect(
        screen.getByRole('textbox', {name: /restaurant name/i}),
      ).toHaveValue(restaurantName);
    });
  });

  describe('when retrying after the store rejects', () => {
    it('displays a server error', async () => {
      await retryingSubmitForm();

      expect(screen.queryByText(serverError)).not.toBeInTheDocument();
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

  async function retryingSubmitForm() {
    const {createRestaurant, user} = setup();
    createRestaurant
      .mockRejectedValueOnce('rejected')
      .mockResolvedValueOnce({id: 1, name: 'Sushi Place'});
    await user.type(
      screen.getByRole('textbox', {name: /restaurant name/i}),
      restaurantName,
    );
    await user.click(screen.getByRole('button', {name: /add/i}));
    await user.click(screen.getByRole('button', {name: /add/i}));
    return {createRestaurant, user};
  }

  async function fillInFormWithServerError() {
    const {createRestaurant, user} = setup();
    createRestaurant.mockRejectedValueOnce('rejected');
    await user.type(
      screen.getByRole('textbox', {name: /restaurant name/i}),
      restaurantName,
    );
    await user.click(screen.getByRole('button', {name: /add/i}));
    return {createRestaurant, user};
  }

  async function fillInForm() {
    const {createRestaurant, user} = setup();
    createRestaurant.mockResolvedValue({id: 1, name: 'Sushi Place'});
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
