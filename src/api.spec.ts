import api from './api';
import nock from 'nock';

describe('api', () => {
  const responseHeaders = {'Access-Control-Allow-Origin': '*'};

  describe('loadRestaurants', () => {
    const restaurants = [{id: 1, name: 'Sushi Place'}];

    it('returns the response from the correct endpoint', async () => {
      nock('https://api.outsidein.dev')
        .get(/^\/\w+\/restaurants$/)
        .reply(200, restaurants, responseHeaders);

      await expect(api.loadRestaurants()).resolves.toEqual(restaurants);
    });
  });

  describe('createRestaurant', () => {
    it('returns the response from the correct endpoint', async () => {
      const restaurantName = 'Sushi Place';
      const responseRestaurant = {id: 1, name: restaurantName};

      nock('https://api.outsidein.dev')
        .post(/^\/\w+\/restaurants$/)
        .reply(201, responseRestaurant, responseHeaders);

      await expect(api.createRestaurant(restaurantName)).resolves.toEqual(
        responseRestaurant,
      );
    });
  });
});
