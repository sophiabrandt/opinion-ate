import {Card, CardContent, Typography} from '@mui/material';
import RestaurantList from './RestaurantList';
import NewRestaurantForm from './NewRestaurantForm';

export default function RestaurantScreen() {
  return (
    <Card sx={{mt: 4}}>
      <CardContent>
        <Typography variant="h5">Restaurants</Typography>
        <NewRestaurantForm />
        <RestaurantList />
      </CardContent>
    </Card>
  );
}
