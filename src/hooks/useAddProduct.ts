import {useState, useEffect, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../redux/store';
import {createProduct} from '../redux/slices/productSlice';
import {Product} from '../models/Product';
import {validateProduct} from '../utils/validation';
import {Alert} from 'react-native';
import {strings} from '../screens/addProductScreen/AddProductScreen.strings';

export const useAddProduct = (navigation: any) => {
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
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const newDateRevision = new Date(dateRelease);
    newDateRevision.setFullYear(dateRelease.getFullYear() + 1);
    setDateRevision(newDateRevision);
  }, [dateRelease]);

  const validateFields = useCallback(async () => {
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
    return valid;
  }, [id, name, description, logo, dateRelease, dateRevision]);

  useEffect(() => {
    if (hasSubmitted) {
      validateFields();
    }
  }, [validateFields, hasSubmitted]);

  const handleSubmit = async () => {
    setHasSubmitted(true);
    const valid = await validateFields();

    if (valid) {
      try {
        const newProduct: Product = {
          id,
          name,
          description,
          logo,
          date_release: dateRelease.toISOString().split('T')[0],
          date_revision: dateRevision.toISOString().split('T')[0],
        };

        await dispatch(createProduct(newProduct)).unwrap();
        Alert.alert(strings.successTitle, strings.successMessage);
        navigation.goBack();
      } catch (error) {
        Alert.alert(strings.errorTitle, strings.errorMessage);
      }
    }
  };

  const resetForm = () => {
    setId('');
    setName('');
    setDescription('');
    setLogo('');
    setDateRelease(new Date());
    setErrors({});
    setHasSubmitted(false);
  };

  const isFormValid =
    Object.keys(errors).length === 0 && id && name && description && logo;

  return {
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
  };
};
