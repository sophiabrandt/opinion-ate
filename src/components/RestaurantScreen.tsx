import RestaurantList from './RestaurantList';

export interface Restaurant {
  id: number;
  name: string;
}

export default function RestaurantScreen() {
  return (
    <div>
      <h1>Restaurants</h1>
      <RestaurantList loadRestaurants={() => {}} restaurants={[]} />
    </div>
  );
}
