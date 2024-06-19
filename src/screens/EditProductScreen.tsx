import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../redux/store';
import {updateProduct, fetchAllProducts} from '../redux/slices/productSlice';
import DatePicker from 'react-native-date-picker';
import TextLabel from '../components/atoms/TextLabel';
import TextInputField from '../components/atoms/TextInputField';
import Button from '../components/atoms/Button';
import {Product} from '../models/Product';

const EditProductScreen = ({
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

  const [id, setId] = useState(product?.id || '');
  const [name, setName] = useState(product?.name || '');
  const [description, setDescription] = useState(product?.description || '');
  const [logo, setLogo] = useState(product?.logo || '');
  const [dateRelease, setDateRelease] = useState(
    new Date(product?.date_release || ''),
  );
  const [dateRevision, setDateRevision] = useState(
    new Date(product?.date_revision || ''),
  );
  const [errors, setErrors] = useState<any>({});
  const [showDateReleasePicker, setShowDateReleasePicker] = useState(false);
  const [showDateRevisionPicker, setShowDateRevisionPicker] = useState(false);

  useEffect(() => {
    const newDateRevision = new Date(dateRelease);
    newDateRevision.setFullYear(dateRelease.getFullYear() + 1);
    setDateRevision(newDateRevision);
  }, [dateRelease]);

  const handleSubmit = async () => {
    if (product) {
      const updatedProduct: Product = {
        ...product,
        name,
        description,
        logo,
        date_release: dateRelease.toISOString().split('T')[0],
        date_revision: dateRevision.toISOString().split('T')[0],
      };

      try {
        await dispatch(updateProduct(updatedProduct)).unwrap();
        await dispatch(fetchAllProducts()).unwrap();
        Alert.alert('Producto actualizado exitosamente');
        navigation.goBack();
      } catch (error) {
        Alert.alert('Error', 'No se pudo actualizar el producto');
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextLabel text="Editar Producto" style={styles.title} />
      <TextLabel text="ID" />
      <TextInputField
        placeholder="ID"
        value={id}
        onChangeText={() => {}}
        style={styles.input}
        editable={false}
      />
      <TextLabel text="Nombre" />
      <TextInputField
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextLabel text="Descripción" />
      <TextInputField
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <TextLabel text="Logo" />
      <TextInputField
        placeholder="URL del logo"
        value={logo}
        onChangeText={setLogo}
        style={styles.input}
      />
      <TextLabel text="Fecha de Liberación" />
      <TouchableOpacity onPress={() => setShowDateReleasePicker(true)}>
        <View style={styles.input}>
          <TextLabel text={dateRelease.toISOString().split('T')[0]} />
        </View>
      </TouchableOpacity>
      <DatePicker
        modal
        open={showDateReleasePicker}
        date={dateRelease}
        mode="date"
        minimumDate={new Date()}
        onConfirm={date => {
          setShowDateReleasePicker(false);
          setDateRelease(date);
        }}
        onCancel={() => {
          setShowDateReleasePicker(false);
        }}
      />
      <TextLabel text="Fecha de Revisión" />
      <View style={styles.input}>
        <TextLabel text={dateRevision.toISOString().split('T')[0]} />
      </View>
      <Button
        title="Guardar Cambios"
        onPress={handleSubmit}
        style={styles.submitButton}
      />
    </ScrollView>
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
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  submitButton: {
    marginTop: 16,
    backgroundColor: '#ffc107',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
});

export default EditProductScreen;
