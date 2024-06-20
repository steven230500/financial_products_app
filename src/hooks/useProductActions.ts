// src/hooks/useProductActions.ts

import {useDispatch} from 'react-redux';
import {AppDispatch} from '../redux/store';
import {deleteProduct, fetchAllProducts} from '../redux/slices/productSlice';
import {Alert} from 'react-native';
import {strings} from '../screens/productDetailScreen/ProductDetailsScreen.strings';

export const useProductActions = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = async (productId: string, onSuccess: () => void) => {
    try {
      await dispatch(deleteProduct(productId)).unwrap();
      await dispatch(fetchAllProducts()).unwrap();
      onSuccess();
    } catch (error) {
      Alert.alert(strings.errorDelete, strings.errorDeleteMessage);
    }
  };

  return {handleDelete};
};
