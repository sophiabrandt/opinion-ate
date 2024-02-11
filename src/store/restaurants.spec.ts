import {configureStore} from '@reduxjs/toolkit';
import restaurantsReducer, {RestaurantsState} from './restaurants/reducers';
import {loadRestaurants} from './restaurants/actions';

describe('restaurants', () => {
  describe('initially', () => {
    it('should not have a loading flag', () => {
      const {store} = setup();

      expect(store.getState().loading).toBe(false);
    });
  });

  describe('loadrestaurants action', () => {
    describe('when loading succeeds', () => {
      it('stores the restaurants', async () => {
        // arrange
        const records = [
          {id: 1, name: 'Sushi Place'},
          {id: 2, name: 'Pizza Place'},
        ];
        const {api, store} = setup();
        api.loadRestaurants.mockResolvedValue(records);

        // act
        await store.dispatch(loadRestaurants() as any);

        // assert
        expect(store.getState().records).toEqual(records);
      });

      it('clears the loading flag', async () => {
        // arrange
        const {api, store} = setup();
        api.loadRestaurants.mockResolvedValue([]);

        // act
        await store.dispatch(loadRestaurants() as any);

        // assert
        expect(store.getState().loading).toBe(false);
      });
    });

    describe('while loading', () => {
      it('sets the loading flag', () => {
        // arrange
        const {store} = setup();

        // act
        store.dispatch(loadRestaurants() as any);

        // assert
        expect(store.getState().loading).toBe(true);
      });
    });
  });

  function setup(
    initialState: RestaurantsState = {records: [], loading: false},
  ) {
    const api = {loadRestaurants: vi.fn()};

    const store = configureStore({
      reducer: restaurantsReducer,
      middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
          thunk: {extraArgument: {api}},
        }),
      preloadedState: initialState,
    });

    return {api, store};
  }
});
