import React, {useState, useEffect} from 'react';
import {View, ScrollView, Alert, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../../redux/store';
import {updateProduct, fetchAllProducts} from '../../redux/slices/productSlice';
import DatePicker from 'react-native-date-picker';
import {Product} from '../../models/Product';
import styles from './EditProductScreen.styles';
import {EditProductScreenProps} from './EditProductScreen.types';
import {strings} from './EditProductScreen.strings';
import {Button, TextInputField, TextLabel} from '../../components/atoms';

const EditProductScreen: React.FC<EditProductScreenProps> = ({
  route,
  navigation,
}) => {
  const {productId} = route.params;
  const dispatch = useDispatch<AppDispatch>();
  const product = useSelector((state: RootState) =>
    state.products.products.find((prod: Product) => prod.id === productId),
  );

  const [id, setId] = useState<string>(product?.id || '');
  const [name, setName] = useState<string>(product?.name || '');
  const [description, setDescription] = useState<string>(
    product?.description || '',
  );
  const [logo, setLogo] = useState<string>(product?.logo || '');
  const [dateRelease, setDateRelease] = useState<Date>(
    new Date(product?.date_release || ''),
  );
  const [dateRevision, setDateRevision] = useState<Date>(
    new Date(product?.date_revision || ''),
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showDateReleasePicker, setShowDateReleasePicker] =
    useState<boolean>(false);

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
        Alert.alert(strings.successTitle, strings.successMessage);
        navigation.goBack();
      } catch (error) {
        Alert.alert(strings.errorTitle, strings.errorMessage);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextLabel text={strings.editProductTitle} style={styles.title} />
      <TextLabel text={strings.idLabel} />
      <TextInputField
        placeholder={strings.idLabel}
        value={id}
        onChangeText={() => {}}
        style={styles.input}
        editable={false}
      />
      <TextLabel text={strings.nameLabel} />
      <TextInputField
        placeholder={strings.namePlaceholder}
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextLabel text={strings.descriptionLabel} />
      <TextInputField
        placeholder={strings.descriptionPlaceholder}
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <TextLabel text={strings.logoLabel} />
      <TextInputField
        placeholder={strings.logoPlaceholder}
        value={logo}
        onChangeText={setLogo}
        style={styles.input}
      />
      <TextLabel text={strings.dateReleaseLabel} />
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
      <TextLabel text={strings.dateRevisionLabel} />
      <View style={styles.input}>
        <TextLabel text={dateRevision.toISOString().split('T')[0]} />
      </View>
      <Button
        title={strings.saveButton}
        onPress={handleSubmit}
        style={styles.submitButton}
      />
    </ScrollView>
  );
};

export default EditProductScreen;
