import {Restaurant} from './types';
import {createReducer} from '@reduxjs/toolkit';
import {loadRestaurants, createRestaurant} from './actions';
import {ServerError} from '../../api';

export interface RestaurantsState {
  records: Restaurant[];
  loading: boolean;
  showErrorMessage: boolean;
}

export const initialRestaurantsState = {
  records: [] as Restaurant[],
  loading: false,
  showErrorMessage: false,
};

const restaurantsReducer = createReducer(initialRestaurantsState, builder => {
  builder
    .addCase(loadRestaurants.fulfilled, (state, action) => {
      state.records = action.payload;
      state.loading = false;
      state.showErrorMessage = false;
    })
    .addCase(loadRestaurants.pending, (state, _action) => {
      state.loading = true;
    })
    .addCase(loadRestaurants.rejected, (state, _action) => {
      state.showErrorMessage = true;
      state.loading = false;
    })
    .addCase(createRestaurant.fulfilled, (state, action) => {
      state.records.push(action.payload);
    })
    .addCase(createRestaurant.pending, (_state, _action) => {
      // noop
    })
    .addCase(createRestaurant.rejected, (_state, _action) => {
      throw new ServerError('Failed to create restaurant. Please try again.');
    });
});

export default restaurantsReducer;
