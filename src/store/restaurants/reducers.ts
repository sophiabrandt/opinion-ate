import {combineReducers} from '@reduxjs/toolkit';
import {Restaurant} from './types';

function records() {
  return [] as Restaurant[];
}

export default combineReducers({records});
