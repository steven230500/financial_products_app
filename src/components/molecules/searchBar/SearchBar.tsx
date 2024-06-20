import React from 'react';
import {TextInput} from 'react-native';
import styles from './SearchBar.styles';
import {SearchBarProps} from './SearchBar.types';

export const SearchBar: React.FC<SearchBarProps> = ({value, onChangeText}) => {
  return (
    <TextInput
      style={styles.searchInput}
      placeholder="Search..."
      value={value}
      onChangeText={onChangeText}
    />
  );
};
