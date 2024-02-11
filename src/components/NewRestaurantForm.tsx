import React from 'react';
import {Button, TextField} from '@mui/material';
import {connect} from 'react-redux';
import {createRestaurant} from '../store/restaurants/actions';

interface NewRestaurantFormProps {
  createRestaurant: (restaurantName: string) => void;
}

type FormDataEntryValue = string | File;

export function NewRestaurantForm({createRestaurant}: NewRestaurantFormProps) {
  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const {restaurantName} = Object.fromEntries(
      new FormData(event.currentTarget),
    );
    assertIsString(restaurantName);

    createRestaurant(restaurantName);
  }

  return (
    <form onSubmit={onSubmit}>
      <fieldset>
        <TextField
          placeholder="Add Restaurant"
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
