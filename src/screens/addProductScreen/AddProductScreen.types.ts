import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  ProductDetail: {productId: string};
  AddProduct: undefined;
  EditProduct: {productId: string};
};

type AddProductScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddProduct'
>;

type AddProductScreenRouteProp = RouteProp<RootStackParamList, 'AddProduct'>;

export interface AddProductScreenProps {
  navigation: AddProductScreenNavigationProp;
  route: AddProductScreenRouteProp;
}
