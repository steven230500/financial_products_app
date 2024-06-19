import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../redux/store';
import {
  updateProduct,
  deleteProduct,
  fetchAllProducts,
} from '../redux/slices/productSlice';
import Button from '../components/atoms/Button';
import BottomSheet from '../components/molecules/BottomSheet';
import {Product} from '../models/Product';

const ProductDetailScreen = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const {productId} = route.params;
  const dispatch = useDispatch<AppDispatch>();
  const product = useSelector((state: RootState) =>
    state.products.products.find((prod: Product) => prod.id === productId),
  );

  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const handleDelete = async () => {
    try {
      await dispatch(deleteProduct(productId)).unwrap();
      await dispatch(fetchAllProducts()).unwrap();
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'No se pudo eliminar el producto');
    }
  };

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Producto no encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ID: {product.id}</Text>
      <Text style={styles.subtitle}>Información extra</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Nombre</Text>
        <Text style={styles.value}>{product.name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Descripción</Text>
        <Text style={styles.value}>{product.description}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Logo</Text>
        <Image source={{uri: product.logo}} style={styles.logo} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Fecha liberación</Text>
        <Text style={styles.value}>{product.date_release}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Fecha revisión</Text>
        <Text style={styles.value}>{product.date_revision}</Text>
      </View>
      <Button
        title="Editar"
        onPress={() => navigation.navigate('EditProduct', {productId})}
        style={styles.editButton}
      />
      <Button
        title="Eliminar"
        onPress={() => setShowBottomSheet(true)}
        style={styles.deleteButton}
      />
      <BottomSheet
        visible={showBottomSheet}
        onClose={() => setShowBottomSheet(false)}>
        <Text style={styles.modalText}>
          ¿Estás seguro de eliminar el producto {product.name}?
        </Text>
        <Button
          title="Confirmar"
          onPress={handleDelete}
          style={styles.modalConfirmButton}
        />
        <Button
          title="Cancelar"
          onPress={() => setShowBottomSheet(false)}
          style={styles.modalCancelButton}
        />
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 16,
  },
  infoContainer: {
    padding: 16,
    marginBottom: 16,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  value: {
    fontSize: 16,
    textAlign: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  editButton: {
    backgroundColor: '#ccc',
    marginTop: 16,
    width: '100%',
  },
  deleteButton: {
    backgroundColor: 'red',
    marginTop: 16,
    width: '100%',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalConfirmButton: {
    backgroundColor: '#ffc107',
    marginBottom: 10,
  },
  modalCancelButton: {
    backgroundColor: '#ccc',
  },
});

export default ProductDetailScreen;
