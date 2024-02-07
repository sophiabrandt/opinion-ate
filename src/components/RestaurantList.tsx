import {useEffect} from 'react';
import {connect} from 'react-redux';
import {Restaurant, restaurantsSlice} from '../store';
import type {RootState} from '../store';

interface RestaurantListProps {
  loadRestaurants: () => void;
  restaurants: Restaurant[];
}

export function RestaurantList({
  loadRestaurants,
  restaurants,
}: RestaurantListProps) {
  useEffect(() => {
    console.log(restaurants);
    loadRestaurants();
  }, []);

  return (
    <ul>
      {JSON.stringify(restaurants, null, 2)}
      {restaurants &&
        restaurants.map(restaurant => (
          <li key={restaurant.id}>{restaurant.name}</li>
        ))}
    </ul>
  );
}

const mapDispatchToProps = {
  loadRestaurants: restaurantsSlice.actions.loadRestaurants,
};

const mapStateToProps = (state: RootState) => ({
  restaurants: state.restaurants.records,
});

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantList);
