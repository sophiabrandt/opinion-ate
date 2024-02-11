import {useEffect} from 'react';
import {connect} from 'react-redux';
import {Restaurant} from '../store/restaurants/types';
import {RootState} from '../store';
import {loadRestaurants} from '../store/restaurants/actions';
import {List, ListItem, ListItemText} from '@mui/material';

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
    <List>
      {restaurants.map(restaurant => (
        <ListItem key={restaurant.id}>
          <ListItemText>{restaurant.name}</ListItemText>
        </ListItem>
      ))}
    </List>
  );
}

const mapDispatchToProps = {
  loadRestaurants,
};

const mapStateToProps = (state: RootState) => ({
  restaurants: state.restaurants.records,
});

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantList);
