import {render, screen} from '@testing-library/react';
import App from './App';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import {ReactNode} from 'react';

describe('App', () => {
  it('renders', () => {
    // arrange
    const {renderWithRedux} = setup();

    // act
    renderWithRedux(<App />);

    // assert
    expect(screen.getByText('Restaurants')).toBeInTheDocument();
  });

  function setup() {
    const store = configureStore({reducer: () => ({state: null})});
    const renderWithRedux = (component: ReactNode) => {
      return {...render(<Provider store={store}>{component}</Provider>)};
    };
    return {renderWithRedux};
  }
});
