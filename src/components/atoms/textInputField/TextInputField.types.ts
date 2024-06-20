import {StyleProp, TextStyle} from 'react-native';

export interface TextInputFieldProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  style?: StyleProp<TextStyle>;
  editable?: boolean;
  testID?: string;
}
