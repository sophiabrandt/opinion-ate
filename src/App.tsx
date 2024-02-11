import RestaurantScreen from './components/RestaurantScreen';
import {Provider} from 'react-redux';
import store from './store';
import {createTheme} from '@mui/material/styles';
import {green} from '@mui/material/colors';
import {ThemeProvider} from '@emotion/react';
import {
  AppBar,
  Container,
  CssBaseline,
  Toolbar,
  Typography,
} from '@mui/material';

const theme = createTheme({
  palette: {
    primary: green,
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Opion Ate</Typography>
          </Toolbar>
        </AppBar>
        <Container>
          <RestaurantScreen />
        </Container>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
