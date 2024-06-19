import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {
  fetchProducts,
  createProduct as apiCreateProduct,
  updateProduct as apiUpdateProduct,
  deleteProduct as apiDeleteProduct,
} from '../../utils/api';
import {Product} from '../../models/Product';

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  filteredProducts: [],
  loading: false,
  error: null,
};

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAll',
  async () => {
    const response = await fetchProducts();
    return response as Product[];
  },
);

export const createProduct = createAsyncThunk(
  'products/create',
  async (product: Product) => {
    const response = await apiCreateProduct(product);
    return response as Product;
  },
);

export const updateProduct = createAsyncThunk(
  'products/update',
  async (product: Product) => {
    const response = await apiUpdateProduct(product.id, product);
    return response as Product;
  },
);

export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (id: string) => {
    await apiDeleteProduct(id);
    return id;
  },
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    filterProducts: (state, action: PayloadAction<string>) => {
      if (Array.isArray(state.products)) {
        state.filteredProducts = state.products.filter((product: Product) =>
          product.name.toLowerCase().includes(action.payload.toLowerCase()),
        );
      } else {
        state.filteredProducts = [];
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllProducts.pending, state => {
        state.loading = true;
      })
      .addCase(
        fetchAllProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.products = action.payload || [];
          state.filteredProducts = action.payload || [];
          state.loading = false;
        },
      )
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch products';
        state.loading = false;
      })
      .addCase(
        createProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.products.push(action.payload);
          state.filteredProducts.push(action.payload);
        },
      )
      .addCase(
        updateProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          const index = state.products.findIndex(
            (product: {id: string}) => product.id === action.payload.id,
          );
          if (index !== -1) {
            state.products[index] = action.payload;
            state.filteredProducts[index] = action.payload;
          }
        },
      )
      .addCase(
        deleteProduct.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.products = state.products.filter(
            (product: {id: string}) => product.id !== action.payload,
          );
          state.filteredProducts = state.filteredProducts.filter(
            (product: {id: string}) => product.id !== action.payload,
          );
        },
      );
  },
});

export const {filterProducts} = productSlice.actions;
export default productSlice.reducer;
