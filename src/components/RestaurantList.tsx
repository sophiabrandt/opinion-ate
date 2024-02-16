import {useEffect} from 'react';
import {ConnectedProps, connect} from 'react-redux';
import {RootState} from '../store';
import {loadRestaurants} from '../store/restaurants/actions';
import {
  Alert,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

const mapStateToProps = (state: RootState) => ({
  restaurants: state.restaurants.records,
  loading: state.restaurants.loading,
  showErrorMessage: state.restaurants.showErrorMessage,
});

const mapDispatchToProps = {
  loadRestaurants,
};

export const connector = connect(mapStateToProps, mapDispatchToProps);

export function RestaurantList({
  loadRestaurants,
  restaurants,
  loading,
  showErrorMessage,
}: ConnectedProps<typeof connector>) {
  useEffect(() => {
    loadRestaurants();
  }, [loadRestaurants]);

  return (
    <>
      {loading ? <CircularProgress /> : null}
      {showErrorMessage ? (
        <Alert severity="error">Restaurants could not be loaded</Alert>
      ) : null}
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

export default connector(RestaurantList);
