import {configureStore} from '@reduxjs/toolkit';
import restaurantsReducer, {
  RestaurantsState,
  initialRestaurantsState,
} from './restaurants/reducers';
import {createRestaurant, loadRestaurants} from './restaurants/actions';

describe('restaurants', () => {
  describe('initially', () => {
    it('should not have a loading flag', () => {
      const {store} = setup();

      expect(store.getState().loading).toBe(false);
    });

    it('should not have a showError flag', () => {
      const {store} = setup();

      expect(store.getState().showErrorMessage).toBe(false);
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

      it('clears the showError flag', async () => {
        // arrange
        const {api, store} = setup({showErrorMessage: true});
        api.loadRestaurants.mockResolvedValue([]);

        // act
        await store.dispatch(loadRestaurants() as any);

        // assert
        expect(store.getState().showErrorMessage).toBe(false);
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

    describe('when loading fails', () => {
      it('sets the showError flag', async () => {
        // arrange
        const {api, store} = setup();
        api.loadRestaurants.mockRejectedValue('error');

        // act
        await store.dispatch(loadRestaurants() as any);

        // assert
        expect(store.getState().showErrorMessage).toBe(true);
      });

      it('clears the loading flag', async () => {
        // arrange
        const {api, store} = setup();
        api.loadRestaurants.mockRejectedValue('error');

        // act
        await store.dispatch(loadRestaurants() as any);

        // assert
        expect(store.getState().loading).toBe(false);
      });
    });
  });
  describe('createRestaurant action', () => {
    it('saves the restaurant to the server', () => {
      // arrange
      const restaurantName = 'Sushi Place';
      const {api, store} = setup();

      // act
      store.dispatch(createRestaurant(restaurantName) as any);

      // assert
      expect(api.createRestaurant).toHaveBeenCalledWith(restaurantName);
    });

    it('stores the returned restaurant in the store', async () => {
      // arrange
      const existingRestaurant = {id: 1, name: 'Pizza Place'};
      const newRestaurant = {id: 2, name: 'Sushi Place'};
      const {api, store} = setup({records: [existingRestaurant]});
      api.createRestaurant.mockResolvedValue(newRestaurant);

      // act
      await store.dispatch(createRestaurant(newRestaurant.name) as any);

      // assert
      expect(store.getState().records).toEqual([
        existingRestaurant,
        newRestaurant,
      ]);
    });
  });

  function setup(overrides: Partial<RestaurantsState> = {}) {
    const api = {
      loadRestaurants: vi.fn().mockName('loadRestaurants'),
      createRestaurant: vi.fn().mockName('createRestaurant'),
    };
    const initialState = {
      ...initialRestaurantsState,
      ...overrides,
    };

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
