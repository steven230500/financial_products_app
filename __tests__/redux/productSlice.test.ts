import {configureStore} from '@reduxjs/toolkit';
import productReducer, {
  fetchAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  filterProducts,
} from '../../src/redux/slices/productSlice';
import {Product} from '../../src/models/Product';

const mockProduct: Product = {
  id: '1',
  name: 'Product 1',
  description: 'Description 1',
  logo: 'logo.png',
  date_release: '2023-01-01',
  date_revision: '2023-01-02',
};

describe('productSlice', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        products: productReducer,
      },
    });
  });

  it('should handle initial state', () => {
    expect(store.getState().products).toEqual({
      products: [],
      filteredProducts: [],
      loading: false,
      error: null,
    });
  });

  it('should handle fetchAllProducts.fulfilled', () => {
    store.dispatch({
      type: fetchAllProducts.fulfilled.type,
      payload: [mockProduct],
    });
    expect(store.getState().products.products).toEqual([mockProduct]);
  });

  it('should handle createProduct.fulfilled', () => {
    store.dispatch({
      type: createProduct.fulfilled.type,
      payload: mockProduct,
    });
    expect(store.getState().products.products).toEqual([mockProduct]);
  });

  it('should handle updateProduct.fulfilled', () => {
    store.dispatch({
      type: fetchAllProducts.fulfilled.type,
      payload: [mockProduct],
    });
    const updatedProduct = {...mockProduct, name: 'Updated Product 1'};
    store.dispatch({
      type: updateProduct.fulfilled.type,
      payload: updatedProduct,
    });
    expect(store.getState().products.products[0].name).toEqual(
      'Updated Product 1',
    );
  });

  it('should handle deleteProduct.fulfilled', () => {
    store.dispatch({
      type: fetchAllProducts.fulfilled.type,
      payload: [mockProduct],
    });
    store.dispatch({
      type: deleteProduct.fulfilled.type,
      payload: '1',
    });
    expect(store.getState().products.products).toEqual([]);
  });

  it('should filter products', () => {
    store.dispatch({
      type: fetchAllProducts.fulfilled.type,
      payload: [mockProduct],
    });
    store.dispatch(filterProducts('Product 1'));
    expect(store.getState().products.filteredProducts).toEqual([mockProduct]);
  });
});
