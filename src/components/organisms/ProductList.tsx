// src/components/organisms/ProductList.tsx
import React from 'react';
import {FlatList} from 'react-native';
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
    <FlatList
      data={products}
      renderItem={renderProduct}
      keyExtractor={item => item.id}
    />
  );
};

export default ProductList;
