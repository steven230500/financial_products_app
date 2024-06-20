import React from 'react';
import {TextInput} from 'react-native';
import styles from './TextInputField.styles';
import {TextInputFieldProps} from './TextInputField.types';

export const TextInputField: React.FC<TextInputFieldProps> = ({
  placeholder,
  value,
  onChangeText,
  style,
  editable = true,
}) => {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholder={placeholder}
      placeholderTextColor="#888"
      value={value}
      onChangeText={onChangeText}
      editable={editable}
    />
  );
};
