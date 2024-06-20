import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../../redux/store';
import {
  fetchAllProducts,
  filterProducts,
} from '../../redux/slices/productSlice';
import SkeletonList from '../../components/organisms/SkeletonList';
import ProductList from '../../components/organisms/ProductList';
import SearchBar from '../../components/molecules/SearchBar';
import Button from '../../components/atoms/Button';
import styles from './HomeScreen.styles';
import {HomeScreenProps} from './HomeScreen.types';
import {strings} from './HomeScreen.strings';

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
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
        title={strings.addButton}
        onPress={() => navigation.navigate('AddProduct')}
        style={styles.addButton}
      />
    </View>
  );
};

export default HomeScreen;
