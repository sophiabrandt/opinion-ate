import {useEffect} from 'react';
import {connect} from 'react-redux';
import {Restaurant} from '../store/restaurants/types';
import {RootState} from '../store';
import {loadRestaurants} from '../store/restaurants/actions';
import {CircularProgress, List, ListItem, ListItemText} from '@mui/material';

export interface RestaurantListProps {
  loadRestaurants: () => void;
  restaurants: Restaurant[];
  loading: boolean;
}

export function RestaurantList({
  loadRestaurants,
  restaurants,
  loading,
}: RestaurantListProps) {
  useEffect(() => {
    loadRestaurants();
  }, [loadRestaurants]);

  return (
    <>
      {loading && <CircularProgress />}
      <List>
        {restaurants.map(restaurant => (
          <ListItem key={restaurant.id}>
            <ListItemText>{restaurant.name}</ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
}

const mapDispatchToProps = {
  loadRestaurants,
};

const mapStateToProps = (state: RootState) => ({
  restaurants: state.restaurants.records,
  loading: state.restaurants.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantList);
