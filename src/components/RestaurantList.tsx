import {useEffect} from 'react';
import {connect} from 'react-redux';
import {Restaurant} from '../store/restaurants/types';
import {RootState} from '../store';
import {loadRestaurants} from '../store/restaurants/actions';
import {
  Alert,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

export interface RestaurantListProps {
  loadRestaurants: () => void;
  restaurants: Restaurant[];
  loading: boolean;
  showErrorMessage: boolean;
}

export function RestaurantList({
  loadRestaurants,
  restaurants,
  loading,
  showErrorMessage,
}: RestaurantListProps) {
  useEffect(() => {
    loadRestaurants();
  }, [loadRestaurants]);

  return (
    <>
      {loading && <CircularProgress />}
      {showErrorMessage && (
        <Alert severity="error">Restaurants could not be loaded</Alert>
      )}
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

const mapStateToProps = (state: RootState) => ({
  restaurants: state.restaurants.records,
  loading: state.restaurants.loading,
  showErrorMessage: state.restaurants.showErrorMessage,
});

const mapDispatchToProps = {
  loadRestaurants,
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantList);
