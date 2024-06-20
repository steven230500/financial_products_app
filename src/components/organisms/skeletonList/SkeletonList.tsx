import React from 'react';
import {View} from 'react-native';
import {SkeletonLoader} from '../../atoms';
import styles from './SkeletonList.styles';

export const SkeletonList: React.FC = () => {
  return (
    <View style={styles.container}>
      {[...Array(5)].map((_, index) => (
        <View key={index} style={styles.skeletonItem}>
          <SkeletonLoader width="100%" height={60} />
        </View>
      ))}
    </View>
  );
};
