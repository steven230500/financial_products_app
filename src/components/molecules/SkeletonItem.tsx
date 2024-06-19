import React from 'react';
import {View, StyleSheet} from 'react-native';
import SkeletonLoader from '../atoms/SkeletonLoader';

const SkeletonItem = () => {
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  textContainer: {
    marginLeft: 16,
  },
});

export default SkeletonItem;
