// src/components/organisms/ProductList.tsx
import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import ProductItem from '../molecules/ProductItem';
import {Product} from '../../models/Product';

const ProductList = ({
  products,
  onProductPress,
}: {
  products: Product[];
  onProductPress: (productId: string) => void;
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
  },
  listContent: {
    paddingTop: 8,
    paddingBottom: 16,
  },
});

export default ProductList;
