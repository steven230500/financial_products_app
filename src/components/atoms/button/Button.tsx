import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from './Button.styles';
import {ButtonProps} from './Button.types';

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  style,
  testID,
  disabled,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style, disabled && {backgroundColor: '#ccc'}]}
      onPress={onPress}
      testID={testID}
      disabled={disabled}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};
