import {Restaurant} from './types';
import {createReducer} from '@reduxjs/toolkit';
import {loadRestaurants, createRestaurant} from './actions';

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
    .addCase(createRestaurant.pending, (state, _action) => {
      // no need to do anything here
    })
    .addCase(createRestaurant.rejected, (state, _action) => {
      // noop
    });
});

export default restaurantsReducer;
