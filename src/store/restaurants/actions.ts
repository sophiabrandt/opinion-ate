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
>('restaurants/load', async (_, {extra: {api}}) => {
  return api.loadRestaurants();
});

export const createRestaurant = createAsyncThunk<
  Restaurant,
  string,
  {
    dispatch: AppDispatch;
    state: RestaurantsState;
    extra: {api: Api};
  }
>('restaurants/create', async (restaurantName: string, {extra: {api}}) => {
  return api.createRestaurant(restaurantName);
});
