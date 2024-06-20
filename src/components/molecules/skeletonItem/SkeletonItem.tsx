import React from 'react';
import {View} from 'react-native';
import styles from './SkeletonItem.styles';
import {SkeletonLoader} from '../../atoms';

export const SkeletonItem: React.FC = () => {
  return (
    <View style={styles.container}>
      <SkeletonLoader width={40} height={40} />
      <View style={styles.textContainer}>
        <SkeletonLoader width="80%" height={20} />
        <SkeletonLoader width="60%" height={20} />
      </View>
    </View>
  );
};
