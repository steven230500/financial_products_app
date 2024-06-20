import React from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-date-picker';
import styles from './EditProductScreen.styles';
import {EditProductScreenProps} from './EditProductScreen.types';
import {strings} from './EditProductScreen.strings';
import {Button, TextInputField, TextLabel} from '../../components/atoms';
import {useEditProduct} from '../../hooks/useEditProduct';

const EditProductScreen: React.FC<EditProductScreenProps> = ({
  route,
  navigation,
}) => {
  const {productId} = route.params;
  const {
    id,
    name,
    description,
    logo,
    dateRelease,
    dateRevision,
    errors,
    showDateReleasePicker,
    setName,
    setDescription,
    setLogo,
    setDateRelease,
    setShowDateReleasePicker,
    handleSubmit,
    hasSubmitted,
  } = useEditProduct(productId, navigation);

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
        style={hasSubmitted && errors.name ? styles.errorInput : undefined}
      />
      {hasSubmitted && errors.name && (
        <TextLabel text={errors.name} style={styles.errorText} />
      )}
      <TextLabel text={strings.descriptionLabel} />
      <TextInputField
        placeholder={strings.descriptionPlaceholder}
        value={description}
        onChangeText={setDescription}
        style={
          hasSubmitted && errors.description ? styles.errorInput : undefined
        }
      />
      {hasSubmitted && errors.description && (
        <TextLabel text={errors.description} style={styles.errorText} />
      )}
      <TextLabel text={strings.logoLabel} />
      <TextInputField
        placeholder={strings.logoPlaceholder}
        value={logo}
        onChangeText={setLogo}
        style={hasSubmitted && errors.logo ? styles.errorInput : undefined}
      />
      {hasSubmitted && errors.logo && (
        <TextLabel text={errors.logo} style={styles.errorText} />
      )}
      <TextLabel text={strings.dateReleaseLabel} />
      <TouchableOpacity onPress={() => setShowDateReleasePicker(true)}>
        <View
          style={
            hasSubmitted && errors.date_release ? styles.errorInput : undefined
          }>
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
      {hasSubmitted && errors.date_release && (
        <TextLabel text={errors.date_release} style={styles.errorText} />
      )}
      <TextLabel text={strings.dateRevisionLabel} />
      <View
        style={
          hasSubmitted && errors.date_revision ? styles.errorInput : undefined
        }>
        <TextLabel text={dateRevision.toISOString().split('T')[0]} />
      </View>
      {hasSubmitted && errors.date_revision && (
        <TextLabel text={errors.date_revision} style={styles.errorText} />
      )}
      <Button
        title={strings.saveButton}
        onPress={handleSubmit}
        style={styles.submitButton}
      />
    </ScrollView>
  );
};

export default EditProductScreen;
