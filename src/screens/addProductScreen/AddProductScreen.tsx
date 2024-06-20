import React from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-date-picker';
import styles from './AddProductScreen.styles';
import {AddProductScreenProps} from './AddProductScreen.types';
import {strings} from './AddProductScreen.strings';
import {Button, TextInputField, TextLabel} from '../../components/atoms';
import {useAddProduct} from '../../hooks/useAddProduct';

const AddProductScreen: React.FC<AddProductScreenProps> = ({navigation}) => {
  const {
    id,
    name,
    description,
    logo,
    dateRelease,
    dateRevision,
    errors,
    showDateReleasePicker,
    setId,
    setName,
    setDescription,
    setLogo,
    setDateRelease,
    setShowDateReleasePicker,
    handleSubmit,
    resetForm,
    isFormValid,
    hasSubmitted,
  } = useAddProduct(navigation);

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
        style={hasSubmitted && errors.id ? styles.errorInput : undefined}
        testID="id-input"
      />
      {hasSubmitted && errors.id && (
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
        style={hasSubmitted && errors.name ? styles.errorInput : undefined}
        testID="name-input"
      />
      {hasSubmitted && errors.name && (
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
        style={
          hasSubmitted && errors.description ? styles.errorInput : undefined
        }
        testID="description-input"
      />
      {hasSubmitted && errors.description && (
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
        style={hasSubmitted && errors.logo ? styles.errorInput : undefined}
        testID="logo-input"
      />
      {hasSubmitted && errors.logo && (
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
            hasSubmitted && errors.date_release ? styles.errorInput : undefined,
          ]}>
          <TextLabel
            text={dateRelease.toISOString().split('T')[0]}
            style={
              hasSubmitted && errors.date_release ? styles.errorText : undefined
            }
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
      {hasSubmitted && errors.date_release && (
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
          hasSubmitted && errors.date_revision ? styles.errorInput : undefined,
        ]}>
        <TextLabel
          text={dateRevision.toISOString().split('T')[0]}
          style={
            hasSubmitted && errors.date_revision ? styles.errorText : undefined
          }
          testID="date-revision-value"
        />
      </View>
      {hasSubmitted && errors.date_revision && (
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
        onPress={resetForm}
        style={styles.resetButton}
        testID="reset-button"
      />
    </ScrollView>
  );
};

export default AddProductScreen;
