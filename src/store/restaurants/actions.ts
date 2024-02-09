import {createAsyncThunk} from '@reduxjs/toolkit';
import {Api, Restaurant} from './types';

export const loadRestaurants = createAsyncThunk<
  Restaurant[],
  void,
  {extra: {api: Api}}
>('restaurants/load', (_, {extra: {api}}) => {
  return api.loadRestaurants();
});
