import React, {useState} from 'react';
import {View, Text, Image, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../../redux/store';
import {deleteProduct, fetchAllProducts} from '../../redux/slices/productSlice';
import Button from '../../components/atoms/Button';
import BottomSheet from '../../components/molecules/BottomSheet';
import {Product} from '../../models/Product';
import styles from './ProductDetailsScreen.styles';
import {ProductDetailScreenProps} from './ProductDetailsScreen.types';
import {strings} from './ProductDetailsScreen.strings';

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const {productId} = route.params;
  const dispatch = useDispatch<AppDispatch>();
  const product = useSelector((state: RootState) =>
    state.products.products.find((prod: Product) => prod.id === productId),
  );

  const [showBottomSheet, setShowBottomSheet] = useState<boolean>(false);

  const handleDelete = async () => {
    try {
      await dispatch(deleteProduct(productId)).unwrap();
      await dispatch(fetchAllProducts()).unwrap();
      navigation.goBack();
    } catch (error) {
      Alert.alert(strings.errorDelete, strings.errorDeleteMessage);
    }
  };

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>{strings.notFound}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {strings.idLabel}: {product.id}
      </Text>
      <Text style={styles.subtitle}>{strings.extraInfo}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>{strings.nameLabel}</Text>
        <Text style={styles.value}>{product.name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>{strings.descriptionLabel}</Text>
        <Text style={styles.value}>{product.description}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>{strings.logoLabel}</Text>
        <Image source={{uri: product.logo}} style={styles.logo} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>{strings.dateReleaseLabel}</Text>
        <Text style={styles.value}>{product.date_release}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>{strings.dateRevisionLabel}</Text>
        <Text style={styles.value}>{product.date_revision}</Text>
      </View>
      <Button
        title={strings.editButton}
        onPress={() => navigation.navigate('EditProduct', {productId})}
        style={styles.editButton}
      />
      <Button
        title={strings.deleteButton}
        onPress={() => setShowBottomSheet(true)}
        style={styles.deleteButton}
      />
      <BottomSheet
        visible={showBottomSheet}
        onClose={() => setShowBottomSheet(false)}>
        <Text style={styles.modalText}>
          {strings.deleteConfirmation} {product.name}?
        </Text>
        <Button
          title={strings.confirmDelete}
          onPress={handleDelete}
          style={styles.modalConfirmButton}
        />
        <Button
          title={strings.cancelDelete}
          onPress={() => setShowBottomSheet(false)}
          style={styles.modalCancelButton}
        />
      </BottomSheet>
    </View>
  );
};

export default ProductDetailScreen;
