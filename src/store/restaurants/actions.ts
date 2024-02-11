import {createAsyncThunk} from '@reduxjs/toolkit';
import {Api, Restaurant} from './types';
import {AppDispatch} from '..';
import {RestaurantsState} from './reducers';

export const loadRestaurants = createAsyncThunk<
  Restaurant[],
  void,
  {
    dispatch: AppDispatch;
    state: RestaurantsState;
    extra: {api: Api};
  }
>('restaurants/load', (_, {extra: {api}}) => {
  return api.loadRestaurants();
});
