import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  ProductDetail: {productId: string};
  AddProduct: undefined;
  EditProduct: {productId: string};
};

type EditProductScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'EditProduct'
>;

type EditProductScreenRouteProp = RouteProp<RootStackParamList, 'EditProduct'>;

export interface EditProductScreenProps {
  navigation: EditProductScreenNavigationProp;
  route: EditProductScreenRouteProp;
}
