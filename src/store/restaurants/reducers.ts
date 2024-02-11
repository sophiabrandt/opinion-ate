import {Restaurant} from './types';
import {createReducer} from '@reduxjs/toolkit';
import {loadRestaurants} from './actions';

export interface RestaurantsState {
  records: Restaurant[];
  loading: boolean;
}

const initialState = {
  records: [] as Restaurant[],
  loading: false,
};

const restaurantsReducer = createReducer(initialState, builder => {
  builder
    .addCase(loadRestaurants.fulfilled, (state, action) => {
      state.records = action.payload;
      state.loading = false;
    })
    .addCase(loadRestaurants.pending, (state, _action) => {
      state.loading = true;
    })
    .addCase(loadRestaurants.rejected, (_state, _action) => {
      // noop
    });
});

export default restaurantsReducer;
