import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import AddProductScreen from '../../src/screens/addProductScreen/AddProductScreen';
import {thunk} from 'redux-thunk';

jest.mock('react-native-date-picker', () => 'DatePicker');

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

describe('AddProductScreen', () => {
  let store: ReturnType<typeof configureStore>;
  let mockDispatch: jest.Mock;

  beforeEach(() => {
    store = mockStore(initialState);
    mockDispatch = jest.fn();
    store.dispatch = mockDispatch;
  });

  it('renders correctly', () => {
    const {getByPlaceholderText, getByText} = render(
      <Provider store={store}>
        <AddProductScreen navigation={{navigate: jest.fn()}} />
      </Provider>,
    );

    expect(getByPlaceholderText('ID')).toBeTruthy();
    expect(getByPlaceholderText('Nombre')).toBeTruthy();
    expect(getByPlaceholderText('Descripción')).toBeTruthy();
    expect(getByPlaceholderText('URL del logo')).toBeTruthy();
    expect(getByText('Enviar')).toBeTruthy();
    expect(getByText('Reiniciar')).toBeTruthy();
  });

  it('shows validation errors when form is submitted with empty fields', async () => {
    const {getByTestId, getByText} = render(
      <Provider store={store}>
        <AddProductScreen navigation={{navigate: jest.fn()}} />
      </Provider>,
    );

    fireEvent.press(getByTestId('submit-button'));

    await waitFor(() => {
      expect(getByText('ID no válido')).toBeTruthy();
      expect(getByText('Nombre no válido')).toBeTruthy();
      expect(getByText('Descripción no válida')).toBeTruthy();
      expect(getByText('Logo es requerido')).toBeTruthy();
      expect(getByText('Fecha de liberación no válida')).toBeTruthy();
      expect(getByText('Fecha de revisión no válida')).toBeTruthy();
    });
  });

  it('dispatches createProduct action with valid input', async () => {
    const mockNavigate = jest.fn();
    const mockProduct = {
      id: '123',
      name: 'Product Name',
      description: 'Product Description',
      logo: 'http://example.com/logo.png',
      date_release: '2024-01-01',
      date_revision: '2025-01-01',
    };

    const {getByPlaceholderText, getByText, getByTestId} = render(
      <Provider store={store}>
        <AddProductScreen navigation={{navigate: mockNavigate}} />
      </Provider>,
    );

    fireEvent.changeText(getByPlaceholderText('ID'), mockProduct.id);
    fireEvent.changeText(getByPlaceholderText('Nombre'), mockProduct.name);
    fireEvent.changeText(
      getByPlaceholderText('Descripción'),
      mockProduct.description,
    );
    fireEvent.changeText(
      getByPlaceholderText('URL del logo'),
      mockProduct.logo,
    );
    fireEvent.press(getByTestId('submit-button'));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
      expect(mockNavigate).toHaveBeenCalledWith('ProductDetail', {
        productId: mockProduct.id,
      });
    });
  });
});
