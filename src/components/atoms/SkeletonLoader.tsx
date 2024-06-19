import React from 'react';
import {View, StyleSheet, Animated, Easing} from 'react-native';

const SkeletonLoader = ({
  width,
  height,
}: {
  width: number | `${number}%` | 'auto';
  height: number | `${number}%` | 'auto';
}) => {
  const opacity = React.useRef(new Animated.Value(0.3)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [opacity]);

  return <Animated.View style={[styles.loader, {width, height, opacity}]} />;
};

const styles = StyleSheet.create({
  loader: {
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
  },
});

export default SkeletonLoader;
