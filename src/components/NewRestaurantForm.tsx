import React from 'react';
import {Button, TextField} from '@mui/material';
import {connect} from 'react-redux';
import {createRestaurant} from '../store/restaurants/actions';

interface NewRestaurantFormProps {
  createRestaurant: (restaurantName: string) => void;
}

export function NewRestaurantForm({createRestaurant}: NewRestaurantFormProps) {
  return (
    <form
      noValidate
      onSubmit={event => onNewRestaurantFormSubmit(event, createRestaurant)}
    >
      <fieldset>
        <TextField
          placeholder="Add Restaurant"
          label="Restaurant Name"
          required
          name="restaurantName"
          defaultValue=""
          fullWidth
          variant="filled"
        />
        <Button type="submit" variant="contained" color="primary">
          Add
        </Button>
      </fieldset>
    </form>
  );
}

function onNewRestaurantFormSubmit(
  event: React.FormEvent<HTMLFormElement>,
  callback: (s: string) => void,
) {
  event.preventDefault();
  const {restaurantName} = Object.fromEntries(
    new FormData(event.currentTarget),
  );
  assertIsString(restaurantName);
  event.currentTarget.reset();

  callback(restaurantName);
}

type FormDataEntryValue = string | File;

function assertIsString(
  restaurantName: FormDataEntryValue,
): asserts restaurantName is string {
  if (typeof restaurantName !== 'string') {
    throw new Error('File is not supported');
  }
}

const mapStateToProps = null;
const mapDispatchToProps = {createRestaurant};

export default connect(mapStateToProps, mapDispatchToProps)(NewRestaurantForm);
