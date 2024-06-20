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

  const isFormValid =
    Object.keys(errors).length === 0 && id && name && description && logo;

  return (
    <ScrollView style={styles.container}>
      <TextLabel
        text={strings.formTitle}
        style={styles.title}
        testID="form-title"
      />
      <TextLabel text={strings.idLabel} testID="id-label" />
      <TextInputField
        placeholder={strings.idPlaceholder}
        value={id}
        onChangeText={setId}
        style={errors.id ? styles.errorInput : undefined}
        testID="id-input"
      />
      {errors.id && (
        <TextLabel
          text={errors.id}
          style={styles.errorText}
          testID="id-error"
        />
      )}
      <TextLabel text={strings.nameLabel} testID="name-label" />
      <TextInputField
        placeholder={strings.namePlaceholder}
        value={name}
        onChangeText={setName}
        style={errors.name ? styles.errorInput : undefined}
        testID="name-input"
      />
      {errors.name && (
        <TextLabel
          text={errors.name}
          style={styles.errorText}
          testID="name-error"
        />
      )}
      <TextLabel text={strings.descriptionLabel} testID="description-label" />
      <TextInputField
        placeholder={strings.descriptionPlaceholder}
        value={description}
        onChangeText={setDescription}
        style={errors.description ? styles.errorInput : undefined}
        testID="description-input"
      />
      {errors.description && (
        <TextLabel
          text={errors.description}
          style={styles.errorText}
          testID="description-error"
        />
      )}
      <TextLabel text={strings.logoLabel} testID="logo-label" />
      <TextInputField
        placeholder={strings.logoPlaceholder}
        value={logo}
        onChangeText={setLogo}
        style={errors.logo ? styles.errorInput : undefined}
        testID="logo-input"
      />
      {errors.logo && (
        <TextLabel
          text={errors.logo}
          style={styles.errorText}
          testID="logo-error"
        />
      )}
      <TextLabel text={strings.dateReleaseLabel} testID="date-release-label" />
      <TouchableOpacity
        onPress={() => setShowDateReleasePicker(true)}
        testID="date-release-picker">
        <View
          style={[
            styles.input,
            styles.dateInput,
            errors.date_release ? styles.errorInput : undefined,
          ]}>
          <TextLabel
            text={dateRelease.toISOString().split('T')[0]}
            style={errors.date_release ? styles.errorText : undefined}
            testID="date-release-value"
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
        <TextLabel
          text={errors.date_release}
          style={styles.errorText}
          testID="date-release-error"
        />
      )}
      <TextLabel
        text={strings.dateRevisionLabel}
        testID="date-revision-label"
      />
      <View
        style={[
          styles.input,
          styles.dateInput,
          errors.date_revision ? styles.errorInput : undefined,
        ]}>
        <TextLabel
          text={dateRevision.toISOString().split('T')[0]}
          style={errors.date_revision ? styles.errorText : undefined}
          testID="date-revision-value"
        />
      </View>
      {errors.date_revision && (
        <TextLabel
          text={errors.date_revision}
          style={styles.errorText}
          testID="date-revision-error"
        />
      )}
      <Button
        title={strings.submitButton}
        onPress={handleSubmit}
        disabled={!isFormValid}
        testID="submit-button"
      />
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
        testID="reset-button"
      />
    </ScrollView>
  );
};

export default AddProductScreen;
