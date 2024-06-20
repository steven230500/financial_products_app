import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../redux/store';
import {fetchAllProducts, filterProducts} from '../redux/slices/productSlice';

export const useProducts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(
    (state: RootState) => state.products.filteredProducts,
  );
  const loading = useSelector((state: RootState) => state.products.loading);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(filterProducts(search));
  }, [search, dispatch]);

  return {products, loading, search, setSearch};
};
