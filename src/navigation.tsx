// AppNavigator.tsx
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/homeScreen/HomeScreen';
import ProductDetailScreen from './screens/productDetailScreen/ProductDetailsScreen';
import AddProductScreen from './screens/addProductScreen/AddProductScreen';
import EditProductScreen from './screens/editProductScreen/EditProductScreen';
import HeaderTitle from './components/molecules/HeaderTitle';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerTitle: () => <HeaderTitle />}}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={{headerTitle: () => <HeaderTitle />}}
        />
        <Stack.Screen
          name="AddProduct"
          component={AddProductScreen}
          options={{headerTitle: () => <HeaderTitle />}}
        />
        <Stack.Screen
          name="EditProduct"
          component={EditProductScreen}
          options={{headerTitle: () => <HeaderTitle />}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
