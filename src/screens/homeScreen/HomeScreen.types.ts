import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  ProductDetail: {productId: string};
  AddProduct: undefined;
  EditProduct: {productId: string};
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

export interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}
