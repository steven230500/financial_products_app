import React, {useState, useEffect} from 'react';
import {View, ScrollView, Alert, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../redux/store';
import {createProduct} from '../../redux/slices/productSlice';
import {Product} from '../../models/Product';
import DatePicker from 'react-native-date-picker';
import {validateProduct} from '../../utils/validation';

import styles from './AddProductScreen.styles';
import {AddProductScreenProps} from './AddProductScreen.types';
import {strings} from './AddProductScreen.strings';
import {Button, TextInputField, TextLabel} from '../../components/atoms';

const AddProductScreen: React.FC<AddProductScreenProps> = ({navigation}) => {
  const [id, setId] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [logo, setLogo] = useState<string>('');
  const [dateRelease, setDateRelease] = useState<Date>(new Date());
  const [dateRevision, setDateRevision] = useState<Date>(
    new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showDateReleasePicker, setShowDateReleasePicker] =
    useState<boolean>(false);
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
        Alert.alert(strings.successTitle, strings.successMessage);
        navigation.goBack();
      } catch (error) {
        Alert.alert(strings.errorTitle, strings.errorMessage);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextLabel text={strings.formTitle} style={styles.title} />
      <TextLabel text={strings.idLabel} />
      <TextInputField
        placeholder={strings.idPlaceholder}
        value={id}
        onChangeText={setId}
        style={errors.id ? styles.errorInput : undefined}
      />
      {errors.id && <TextLabel text={errors.id} style={styles.errorText} />}
      <TextLabel text={strings.nameLabel} />
      <TextInputField
        placeholder={strings.namePlaceholder}
        value={name}
        onChangeText={setName}
        style={errors.name ? styles.errorInput : undefined}
      />
      {errors.name && <TextLabel text={errors.name} style={styles.errorText} />}
      <TextLabel text={strings.descriptionLabel} />
      <TextInputField
        placeholder={strings.descriptionPlaceholder}
        value={description}
        onChangeText={setDescription}
        style={errors.description ? styles.errorInput : undefined}
      />
      {errors.description && (
        <TextLabel text={errors.description} style={styles.errorText} />
      )}
      <TextLabel text={strings.logoLabel} />
      <TextInputField
        placeholder={strings.logoPlaceholder}
        value={logo}
        onChangeText={setLogo}
        style={errors.logo ? styles.errorInput : undefined}
      />
      {errors.logo && <TextLabel text={errors.logo} style={styles.errorText} />}
      <TextLabel text={strings.dateReleaseLabel} />
      <TouchableOpacity onPress={() => setShowDateReleasePicker(true)}>
        <View
          style={[
            styles.input,
            styles.dateInput,
            errors.date_release ? styles.errorInput : undefined,
          ]}>
          <TextLabel
            text={dateRelease.toISOString().split('T')[0]}
            style={errors.date_release ? styles.errorText : undefined}
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
      <TextLabel text={strings.dateRevisionLabel} />
      <View
        style={[
          styles.input,
          styles.dateInput,
          errors.date_revision ? styles.errorInput : undefined,
        ]}>
        <TextLabel
          text={dateRevision.toISOString().split('T')[0]}
          style={errors.date_revision ? styles.errorText : undefined}
        />
      </View>
      {errors.date_revision && (
        <TextLabel text={errors.date_revision} style={styles.errorText} />
      )}
      <Button title={strings.submitButton} onPress={handleSubmit} />
      <Button
        title={strings.resetButton}
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

export default AddProductScreen;
