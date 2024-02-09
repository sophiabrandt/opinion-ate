import {useEffect} from 'react';
import {connect} from 'react-redux';
import {Restaurant} from '../store/restaurants/types';
import {RootState} from '../store';
import {loadRestaurants} from '../store/restaurants/actions';

interface RestaurantListProps {
  loadRestaurants: () => void;
  restaurants: Restaurant[];
}

export function RestaurantList({
  loadRestaurants,
  restaurants,
}: RestaurantListProps) {
  useEffect(() => {
    loadRestaurants();
  }, [loadRestaurants]);

  return (
    <ul>
      {restaurants.map(restaurant => (
        <li key={restaurant.id}>{restaurant.name}</li>
      ))}
    </ul>
  );
}

const mapDispatchToProps = {
  loadRestaurants,
};

const mapStateToProps = (state: RootState) => ({
  restaurants: state.restaurants.records,
});

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantList);
