import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const TextInputField = ({
  placeholder,
  value,
  onChangeText,
  style,
  editable = true,
}: {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  style?: object;
  editable?: boolean;
}) => {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholder={placeholder}
      placeholderTextColor="#888"
      value={value}
      onChangeText={onChangeText}
      editable={editable} // Usamos editable aquí
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
    color: '#000',
  },
});

export default TextInputField;
