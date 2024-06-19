import React from 'react';
import {View, StyleSheet} from 'react-native';
import SkeletonLoader from '../atoms/SkeletonLoader';

const SkeletonList = () => {
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

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  skeletonItem: {
    marginBottom: 16,
  },
});

export default SkeletonList;
