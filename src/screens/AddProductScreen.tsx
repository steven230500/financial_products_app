import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../redux/store';
import {createProduct} from '../redux/slices/productSlice';
import {Product} from '../models/Product';
import DatePicker from 'react-native-date-picker';
import {validateProduct} from '../utils/validation';
import TextLabel from '../components/atoms/TextLabel';
import TextInputField from '../components/atoms/TextInputField';
import Button from '../components/atoms/Button';

const AddProductScreen = ({navigation}: {navigation: any}) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [logo, setLogo] = useState('');
  const [dateRelease, setDateRelease] = useState(new Date());
  const [dateRevision, setDateRevision] = useState(
    new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  );
  const [errors, setErrors] = useState<any>({});
  const [showDateReleasePicker, setShowDateReleasePicker] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const newDateRevision = new Date(dateRelease);
    newDateRevision.setFullYear(dateRelease.getFullYear() + 1);
    setDateRevision(newDateRevision);
  }, [dateRelease]);

  const handleSubmit = async () => {
    const newProduct: Product = {
      id,
      name,
      description,
      logo,
      date_release: dateRelease.toISOString().split('T')[0],
      date_revision: dateRevision.toISOString().split('T')[0],
    };

    const {valid, errors} = await validateProduct(newProduct);
    setErrors(errors);

    if (valid) {
      try {
        await dispatch(createProduct(newProduct)).unwrap();
        Alert.alert('Producto agregado exitosamente');
        navigation.goBack();
      } catch (error) {
        Alert.alert('Error', 'No se pudo agregar el producto');
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextLabel text="Formulario de Registro" style={styles.title} />
      <TextLabel text="ID" />
      <TextInputField
        placeholder="ID"
        value={id}
        onChangeText={setId}
        style={errors.id && styles.errorInput}
      />
      {errors.id && <TextLabel text={errors.id} style={styles.errorText} />}
      <TextLabel text="Nombre" />
      <TextInputField
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
        style={errors.name && styles.errorInput}
      />
      {errors.name && <TextLabel text={errors.name} style={styles.errorText} />}
      <TextLabel text="Descripción" />
      <TextInputField
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
        style={errors.description && styles.errorInput}
      />
      {errors.description && (
        <TextLabel text={errors.description} style={styles.errorText} />
      )}
      <TextLabel text="Logo" />
      <TextInputField
        placeholder="URL del logo"
        value={logo}
        onChangeText={setLogo}
        style={errors.logo && styles.errorInput}
      />
      {errors.logo && <TextLabel text={errors.logo} style={styles.errorText} />}
      <TextLabel text="Fecha de Liberación" />
      <TouchableOpacity onPress={() => setShowDateReleasePicker(true)}>
        <View
          style={[
            styles.input,
            styles.dateInput,
            errors.date_release && styles.errorInput,
          ]}>
          <TextLabel
            text={dateRelease.toISOString().split('T')[0]}
            style={errors.date_release && styles.errorText}
          />
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
      {errors.date_release && (
        <TextLabel text={errors.date_release} style={styles.errorText} />
      )}
      <TextLabel text="Fecha de Revisión" />
      <View
        style={[
          styles.input,
          styles.dateInput,
          errors.date_revision && styles.errorInput,
        ]}>
        <TextLabel
          text={dateRevision.toISOString().split('T')[0]}
          style={errors.date_revision && styles.errorText}
        />
      </View>
      {errors.date_revision && (
        <TextLabel text={errors.date_revision} style={styles.errorText} />
      )}
      <Button title="Enviar" onPress={handleSubmit} />
      <Button
        title="Reiniciar"
        onPress={() => {
          setId('');
          setName('');
          setDescription('');
          setLogo('');
          setDateRelease(new Date());
          setErrors({});
        }}
        style={styles.resetButton}
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
    color: '#000000',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
    color: '#000',
  },
  dateInput: {
    justifyContent: 'center',
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
  resetButton: {
    backgroundColor: '#ccc',
    marginTop: 10,
  },
});

export default AddProductScreen;
