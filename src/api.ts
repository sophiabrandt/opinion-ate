import axios from 'axios';
import {Api} from './store/restaurants/types';

const client = axios.create({
  baseURL: `https://api.outsidein.dev/${import.meta.env.VITE_API_KEY}`,
});

const api: Api = {
  loadRestaurants: async () => {
    const response = await client.get('/restaurants');
    return response.data;
  },
  createRestaurant: async (name: string) => {
    const response = await client.post('/restaurants', {name});
    return response.data;
  },
};

export default api;
