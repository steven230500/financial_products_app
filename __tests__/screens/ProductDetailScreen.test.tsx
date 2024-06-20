import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import ProductDetailScreen from '../../src/screens/productDetailScreen/ProductDetailsScreen';
import {
  deleteProduct,
  fetchAllProducts,
} from '../../src/redux/slices/productSlice';
import {thunk} from 'redux-thunk';

const notFoundIcon = require('../../assets/icons/notFound.png');

jest.mock('../../assets/icons/notFound.png', () => 'notFoundIcon');

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  products: {
    products: [
      {
        id: '1',
        name: 'Product 1',
        description: 'Description 1',
        logo: 'http://example.com/logo1.png',
        date_release: '2023-01-01',
        date_revision: '2024-01-01',
      },
    ],
    filteredProducts: [],
    loading: false,
    error: null,
  },
};

describe('ProductDetailScreen', () => {
  let store: ReturnType<typeof configureStore>;
  let mockDispatch: jest.Mock;

  beforeEach(() => {
    store = mockStore(initialState);
    mockDispatch = jest.fn();
    store.dispatch = mockDispatch;
  });

  const renderComponent = (props: any) =>
    render(
      <Provider store={store}>
        <ProductDetailScreen {...props} />
      </Provider>,
    );

  it('renders correctly when product exists', () => {
    const {getByText, getByTestId} = renderComponent({
      route: {params: {productId: '1'}},
      navigation: {navigate: jest.fn(), goBack: jest.fn()},
    });

    expect(getByText('ID: 1')).toBeTruthy();
    expect(getByText('Product 1')).toBeTruthy();
    expect(getByText('Description 1')).toBeTruthy();
    expect(getByTestId('product-image')).toHaveProp('source', {
      uri: 'http://example.com/logo1.png',
    });
  });

  it('renders not found message when product does not exist', () => {
    const {getByText} = renderComponent({
      route: {params: {productId: '2'}},
      navigation: {navigate: jest.fn(), goBack: jest.fn()},
    });

    expect(getByText('Producto no encontrado')).toBeTruthy();
  });

  it('displays a fallback image when the product logo is invalid', () => {
    const modifiedState = {
      ...initialState,
      products: {
        ...initialState.products,
        products: [
          {
            id: '1',
            name: 'Product 1',
            description: 'Description 1',
            logo: 'invalid-url',
            date_release: '2023-01-01',
            date_revision: '2024-01-01',
          },
        ],
      },
    };

    store = mockStore(modifiedState);

    const {getByTestId} = renderComponent({
      route: {params: {productId: '1'}},
      navigation: {navigate: jest.fn(), goBack: jest.fn()},
    });

    expect(getByTestId('product-image-fallback')).toHaveProp(
      'source',
      'notFoundIcon',
    );
  });

  it('calls deleteProduct and fetchAllProducts when delete is confirmed', async () => {
    const mockNavigate = jest.fn();
    const {getByText} = renderComponent({
      route: {params: {productId: '1'}},
      navigation: {navigate: mockNavigate, goBack: jest.fn()},
    });

    fireEvent.press(getByText('Eliminar'));
    fireEvent.press(getByText('Confirmar'));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenCalledWith(deleteProduct('1'));
      expect(mockDispatch).toHaveBeenCalledWith(fetchAllProducts());
      expect(mockNavigate).toHaveBeenCalled();
    });
  });
});
