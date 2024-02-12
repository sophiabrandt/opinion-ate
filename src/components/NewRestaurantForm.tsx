import React from 'react';
import {Alert, Button, TextField} from '@mui/material';
import {connect} from 'react-redux';
import {createRestaurant} from '../store/restaurants/actions';
import {Restaurant} from '../store/restaurants/types';

interface NewRestaurantFormProps {
  createRestaurant: (restaurantName: string) => Promise<Restaurant>;
}

export function NewRestaurantForm({createRestaurant}: NewRestaurantFormProps) {
  const [validationError, setValidationError] = React.useState(false);
  const [serverError, setServerError] = React.useState(false);

  return (
    <form
      noValidate
      onSubmit={event =>
        onNewRestaurantFormSubmit(
          event,
          createRestaurant,
          setValidationError,
          setServerError,
        )
      }
    >
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

function onNewRestaurantFormSubmit(
  event: React.FormEvent<HTMLFormElement>,
  callback: (s: string) => Promise<Restaurant>,
  setValidationError: (b: boolean) => void,
  setServerError: (b: boolean) => void,
) {
  event.preventDefault();
  const {restaurantName} = Object.fromEntries(
    new FormData(event.currentTarget),
  );
  assertIsString(restaurantName);
  setValidationError(!restaurantName);
  event.currentTarget.reset();
  submit(restaurantName, callback, setServerError);
}

type FormDataEntryValue = string | File;

function assertIsString(
  restaurantName: FormDataEntryValue,
): asserts restaurantName is string {
  if (typeof restaurantName !== 'string') {
    throw new Error('File is not supported');
  }
}

async function submit(
  restaurantName: string,
  callback: (s: string) => Promise<Restaurant>,
  setServerError: (b: boolean) => void,
) {
  if (restaurantName) {
    try {
      await callback(restaurantName);
    } catch (e) {
      setServerError(true);
    }
  }
}

const mapStateToProps = null;
const mapDispatchToProps = {createRestaurant};

// @ts-ignore
// Unfortunately, I cannot figure out how to type mapDispatchToProps correctly
export default connect(mapStateToProps, mapDispatchToProps)(NewRestaurantForm);
