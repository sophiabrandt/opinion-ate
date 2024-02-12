import React from 'react';
import {Button, TextField} from '@mui/material';
import {connect} from 'react-redux';
import {createRestaurant} from '../store/restaurants/actions';

interface NewRestaurantFormProps {
  createRestaurant: (restaurantName: string) => void;
}

export function NewRestaurantForm({createRestaurant}: NewRestaurantFormProps) {
  const [error, setError] = React.useState(false);

  return (
    <form
      noValidate
      onSubmit={event =>
        onNewRestaurantFormSubmit(event, error, setError, createRestaurant)
      }
    >
      <TextField
        placeholder="Add Restaurant"
        label="Restaurant Name"
        error={error}
        helperText={error ? 'Restaurant Name is required' : ''}
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
  error: boolean,
  setError: (b: boolean) => void,
  callback: (s: string) => void,
) {
  event.preventDefault();
  const {restaurantName} = Object.fromEntries(
    new FormData(event.currentTarget),
  );
  assertIsString(restaurantName);
  setError(!restaurantName);
  event.currentTarget.reset();
  submit(restaurantName, callback);
}

type FormDataEntryValue = string | File;

function assertIsString(
  restaurantName: FormDataEntryValue,
): asserts restaurantName is string {
  if (typeof restaurantName !== 'string') {
    throw new Error('File is not supported');
  }
}

function submit(restaurantName: string, callback: (s: string) => void) {
  if (restaurantName) {
    callback(restaurantName);
  }
}

const mapStateToProps = null;
const mapDispatchToProps = {createRestaurant};

export default connect(mapStateToProps, mapDispatchToProps)(NewRestaurantForm);
