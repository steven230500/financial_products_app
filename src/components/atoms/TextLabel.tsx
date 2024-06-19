import React from 'react';
import {Text, StyleSheet} from 'react-native';

const TextLabel = ({text, style}: {text: string; style?: object}) => {
  return <Text style={[styles.label, style]}>{text}</Text>;
};

const styles = StyleSheet.create({
  label: {
    color: '#000',
    marginBottom: 4,
  },
});

export default TextLabel;
