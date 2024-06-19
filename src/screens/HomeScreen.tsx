import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../redux/store';
import {fetchAllProducts, filterProducts} from '../redux/slices/productSlice';
import SkeletonList from '../components/organisms/SkeletonList';
import ProductList from '../components/organisms/ProductList';
import SearchBar from '../components/molecules/SearchBar';
import Button from '../components/atoms/Button';

const HomeScreen = ({navigation}: {navigation: any}) => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(
    (state: RootState) => state.products.filteredProducts,
  );
  const loading = useSelector((state: RootState) => state.products.loading);

  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(filterProducts(search));
  }, [search, dispatch]);

  return (
    <View style={styles.container}>
      <SearchBar value={search} onChangeText={setSearch} />
      {loading ? (
        <SkeletonList />
      ) : (
        <ProductList
          products={products}
          onProductPress={(productId: string) =>
            navigation.navigate('ProductDetail', {productId})
          }
        />
      )}
      <Button
        title="Agregar"
        onPress={() => navigation.navigate('AddProduct')}
        style={styles.addButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  addButton: {
    marginVertical: 16,
    backgroundColor: '#ffc107',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
});

export default HomeScreen;
