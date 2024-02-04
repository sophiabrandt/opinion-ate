import {useEffect} from 'react';
import {Restaurant} from './RestaurantScreen';

interface RestaurantListProps {
  loadRestaurants: () => void;
  restaurants: Restaurant[];
}

export default function RestaurantList({
  loadRestaurants,
  restaurants,
}: RestaurantListProps) {
  useEffect(() => {
    loadRestaurants();
  }, []);

  return (
    <ul>
      {restaurants.map(restaurant => (
        <li key={restaurant.id}>{restaurant.name}</li>
      ))}
    </ul>
  );
}
