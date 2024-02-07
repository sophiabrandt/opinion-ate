import {createAppSlice} from '../app/createAppSlice';

export interface Restaurant {
  id: number;
  name: string;
}

export interface RestaurantsState {
  records: Restaurant[];
}

const initialState = {
  records: [],
};

export const restaurantsSlice = createAppSlice({
  name: 'restaurants',
  initialState,
  reducers: create => ({
    loadRestaurants: create.reducer(state => ({
      ...state,
    })),
  }),
  selectors: {
    records: state => state.records,
  },
});

export const {loadRestaurants} = restaurantsSlice.actions;

export const {records} = restaurantsSlice.selectors;
