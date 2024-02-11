import {Restaurant} from './types';
import {createReducer} from '@reduxjs/toolkit';
import {loadRestaurants} from './actions';

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
    });
});

export default restaurantsReducer;
