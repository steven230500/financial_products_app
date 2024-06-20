import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {Product} from '../../models/Product';
import styles from './ProductDetailsScreen.styles';
import {ProductDetailScreenProps} from './ProductDetailsScreen.types';
import {strings} from './ProductDetailsScreen.strings';
import {Button} from '../../components/atoms';
import {BottomSheet} from '../../components/molecules';
import {useProductActions} from '../../hooks/useProductActions';

const notFoundIcon = require('../../../assets/icons/notFound.png');

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const {productId} = route.params;
  const product = useSelector((state: RootState) =>
    state.products.products.find((prod: Product) => prod.id === productId),
  );

  const [showBottomSheet, setShowBottomSheet] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);
  const {handleDelete} = useProductActions();

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
        {product.logo && !imageError ? (
          <Image
            source={{uri: product.logo}}
            style={styles.logo}
            onError={() => setImageError(true)}
            testID="product-image"
          />
        ) : (
          <Image
            source={notFoundIcon}
            style={styles.logo}
            testID="product-image-fallback"
          />
        )}
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
        testID="edit-button"
      />
      <Button
        title={strings.deleteButton}
        onPress={() => setShowBottomSheet(true)}
        style={styles.deleteButton}
        testID="delete-button"
      />
      <BottomSheet
        visible={showBottomSheet}
        onClose={() => setShowBottomSheet(false)}>
        <Text style={styles.modalText}>
          {strings.deleteConfirmation} {product.name}?
        </Text>
        <Button
          title={strings.confirmDelete}
          onPress={() => handleDelete(productId, () => navigation.goBack())}
          style={styles.modalConfirmButton}
          testID="confirm-delete-button"
        />
        <Button
          title={strings.cancelDelete}
          onPress={() => setShowBottomSheet(false)}
          style={styles.modalCancelButton}
          testID="cancel-delete-button"
        />
      </BottomSheet>
    </View>
  );
};

export default ProductDetailScreen;
