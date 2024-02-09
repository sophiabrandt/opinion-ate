import {combineReducers} from '@reduxjs/toolkit';
import {Restaurant} from './types';
import {createReducer} from '@reduxjs/toolkit';
import {loadRestaurants} from './actions';

const initialState: Restaurant[] = [];

const records = createReducer(initialState, builder => {
  builder
    .addCase(loadRestaurants.fulfilled, (_state, action) => {
      return action.payload;
    })
    .addCase(loadRestaurants.pending, (_state, _action) => {
      // noop
    })
    .addCase(loadRestaurants.rejected, (_state, _action) => {
      // noop
    });
});

export default combineReducers({records});
