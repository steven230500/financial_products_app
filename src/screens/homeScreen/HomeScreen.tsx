import React from 'react';
import {View} from 'react-native';
import styles from './HomeScreen.styles';
import {HomeScreenProps} from './HomeScreen.types';
import {strings} from './HomeScreen.strings';
import {Button} from '../../components/atoms';
import {SearchBar} from '../../components/molecules';
import {ProductList, SkeletonList} from '../../components/organisms';
import {useProducts} from '../../hooks/useProducts';

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const {products, loading, search, setSearch} = useProducts();

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
