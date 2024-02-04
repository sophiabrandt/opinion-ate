import {useEffect} from 'react';

interface RestaurantListProps {
  loadRestaurants: () => void;
}

export default function RestaurantList({loadRestaurants}: RestaurantListProps) {
  useEffect(() => {
    loadRestaurants();
  }, []);

  return (
    <ul>
      <li>Restaurant 1</li>
    </ul>
  );
}
