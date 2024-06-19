// components/molecules/HeaderTitle.tsx
import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import iconPath from '../../../assets/icons/bank.png';

const HeaderTitle = () => (
  <View style={styles.headerContainer}>
    <Image source={iconPath} style={styles.icon} />
    <Text style={styles.headerText}>Banco</Text>
  </View>
);

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#c2cce4',
  },
});

export default HeaderTitle;
