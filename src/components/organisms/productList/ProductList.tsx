import React from 'react';
import {FlatList, View} from 'react-native';
import {Product} from '../../../models/Product';
import {ProductItem} from '../../molecules';
import styles from './ProductList.styles';
import {ProductListProps} from './ProductList.types';

export const ProductList: React.FC<ProductListProps> = ({
  products,
  onProductPress,
}) => {
  const renderProduct = ({item}: {item: Product}) => (
    <ProductItem product={item} onPress={() => onProductPress(item.id)} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        testID="product-list"
      />
    </View>
  );
};
