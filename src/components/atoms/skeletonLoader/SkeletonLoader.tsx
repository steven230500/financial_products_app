import React from 'react';
import {Animated, Easing} from 'react-native';
import styles from './SkeletonLoader.styles';
import {SkeletonLoaderProps} from './SkeletonLoader.types';

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  width,
  height,
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
