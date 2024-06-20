import React from 'react';
import {View, TouchableOpacity, Modal} from 'react-native';
import styles from './BottomSheet.styles';
import {BottomSheetProps} from './BottomSheet.types';

export const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  children,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      testID="bottom-sheet">
      <TouchableOpacity
        style={styles.overlay}
        onPress={onClose}
        testID="overlay"
      />
      <View style={styles.container}>{children}</View>
    </Modal>
  );
};
