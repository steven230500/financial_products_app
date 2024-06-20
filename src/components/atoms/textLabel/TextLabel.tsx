import React from 'react';
import {Text} from 'react-native';
import styles from './TextLabel.styles';
import {TextLabelProps} from './TextLabel.types';

export const TextLabel: React.FC<TextLabelProps> = ({text, style, testID}) => {
  return (
    <Text style={[styles.label, style]} testID={testID}>
      {text}
    </Text>
  );
};
