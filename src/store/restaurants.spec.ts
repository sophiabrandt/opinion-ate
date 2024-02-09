import {configureStore} from '@reduxjs/toolkit';
import restaurantsReducer from './restaurants/reducers';
import {loadRestaurants} from './restaurants/actions';

describe('restaurants', () => {
  describe('loadrestaurants action', () => {
    it('stores the restaurants', async () => {
      // arrange
      const records = [
        {id: 1, name: 'Sushi Place'},
        {id: 2, name: 'Pizza Place'},
      ];
      const api = {loadRestaurants: () => Promise.resolve(records)};
      const initialState = {records: []};
      const store = configureStore({
        reducer: restaurantsReducer,
        middleware: getDefaultMiddleware =>
          getDefaultMiddleware({
            thunk: {extraArgument: {api}},
          }),
        preloadedState: initialState,
      });

      // act
      await store.dispatch(loadRestaurants());

      // assert
      expect(store.getState().records).toEqual(records);
    });
  });
});
