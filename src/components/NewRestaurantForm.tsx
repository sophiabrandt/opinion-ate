import {Alert, Button, TextField} from '@mui/material';
import {ConnectedProps, connect} from 'react-redux';
import {createRestaurant} from '../store/restaurants/actions';
import {useNewRestaurantForm} from '../hooks/useNewRestaurantForm';
import React from 'react';

const mapDispatchToProps = {createRestaurant};
const connector = connect(null, mapDispatchToProps);

export function NewRestaurantForm({
  createRestaurant,
}: ConnectedProps<typeof connector>) {
  const [validationError, setValidationError] = React.useState<boolean>(false);
  const [serverError, setServerError] = React.useState<boolean>(false);

  const {handleFormSubmit} = useNewRestaurantForm({
    handler: createRestaurant,
    setValidationError,
    setServerError,
  });

  return (
    <form noValidate onSubmit={handleFormSubmit}>
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
