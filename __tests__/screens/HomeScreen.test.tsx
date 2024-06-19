import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import HomeScreen from '../../src/screens/HomeScreen';
import {thunk} from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  products: {
    products: [],
    filteredProducts: [],
    loading: false,
    error: null,
  },
};

const store = mockStore(initialState);

describe('HomeScreen', () => {
  it('renders correctly', () => {
    const {getByText} = render(
      <Provider store={store}>
        <HomeScreen navigation={{navigate: jest.fn()}} />
      </Provider>,
    );

    expect(getByText('Agregar')).toBeTruthy();
  });

  it('dispatches fetchAllProducts on mount', () => {
    render(
      <Provider store={store}>
        <HomeScreen navigation={{navigate: jest.fn()}} />
      </Provider>,
    );

    const actions = store.getActions();
    expect(actions[0].type).toEqual('products/fetchAll/pending');
  });

  it('filters products based on search input', () => {
    const {getByPlaceholderText} = render(
      <Provider store={store}>
        <HomeScreen navigation={{navigate: jest.fn()}} />
      </Provider>,
    );

    const searchInput = getByPlaceholderText('Search...');
    fireEvent.changeText(searchInput, 'Product 1');

    const actions = store.getActions();
    expect(actions[1].type).toEqual('products/filterProducts');
  });
});
