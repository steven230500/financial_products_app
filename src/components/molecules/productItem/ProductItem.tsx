import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './ProductItem.styles';
import {ProductItemProps} from './ProductItem.types';

export const ProductItem: React.FC<ProductItemProps> = ({product, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.touchable}
      testID="product-item">
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.id}>ID: {product.id}</Text>
        </View>
        <View style={styles.arrowContainer}>
          <Text style={styles.arrow}>›</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
