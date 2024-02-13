import React from 'react';
import {Alert, Button, TextField} from '@mui/material';
import {ConnectedProps, connect} from 'react-redux';
import {createRestaurant} from '../store/restaurants/actions';

const mapDispatchToProps = {createRestaurant};
const connector = connect(null, mapDispatchToProps);

export function NewRestaurantForm({
  createRestaurant,
}: ConnectedProps<typeof connector>) {
  const [validationError, setValidationError] = React.useState(false);
  const [serverError, setServerError] = React.useState(false);

  function extractFormData(
    event: React.FormEvent<HTMLFormElement>,
  ): string | null {
    const formData = new FormData(event.currentTarget);
    const restaurantName = formData.get('restaurantName');
    if (
      !restaurantName ||
      typeof restaurantName !== 'string' ||
      !restaurantName.trim()
    ) {
      setValidationError(true);
      return null;
    }
    return restaurantName.trim();
  }

  async function onNewRestaurantFormSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setValidationError(false);
    const restaurantName = extractFormData(event);

    if (restaurantName) {
      try {
        event.currentTarget.reset();
        await createRestaurant(restaurantName);
      } catch (e) {
        setServerError(true);
      }
    } else {
      setValidationError(true);
    }
  }

  return (
    <form noValidate onSubmit={onNewRestaurantFormSubmit}>
      {serverError ? (
        <Alert severity="error">
          The restaurant could not be saved. Please try again.
        </Alert>
      ) : null}
      <TextField
        placeholder="Add Restaurant"
        label="Restaurant Name"
        error={validationError}
        helperText={validationError ? 'Restaurant Name is required' : ''}
        required
        name="restaurantName"
        defaultValue=""
        fullWidth
        variant="filled"
      />
      <Button type="submit" variant="contained" color="primary">
        Add
      </Button>
    </form>
  );
}

export default connector(NewRestaurantForm);
