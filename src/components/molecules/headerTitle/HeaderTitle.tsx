import React from 'react';
import {View, Image, Text} from 'react-native';
import styles from './HeaderTitle.styles';
import {strings} from './HeaderTitle.strings';

const iconPath = require('../../../../assets/icons/bank.png');

export const HeaderTitle: React.FC = () => (
  <View style={styles.headerContainer}>
    <Image source={iconPath} style={styles.icon} testID="header-icon" />
    <Text style={styles.headerText}>{strings.title}</Text>
  </View>
);
