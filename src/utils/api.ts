// src/utils/api.ts
import http from './http';
import {Product} from '../models/Product';

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await http.get('/products');

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyProductId = async (id: string): Promise<boolean> => {
  try {
    const response = await http.get(`/products/verification/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createProduct = async (product: Product): Promise<Product> => {
  try {
    const response = await http.post('/products', product);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (
  id: string,
  product: Product,
): Promise<Product> => {
  try {
    const response = await http.put(`/products/${id}`, product);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    await http.delete(`/products/${id}`);
  } catch (error) {
    throw error;
  }
};
