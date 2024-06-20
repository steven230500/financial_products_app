import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from './Button.styles';
import {ButtonProps} from './Button.types';

export const Button: React.FC<ButtonProps> = ({title, onPress, style}) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};
