import {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../redux/store';
import {updateProduct, fetchAllProducts} from '../redux/slices/productSlice';
import {Product} from '../models/Product';
import {Alert} from 'react-native';
import {strings} from '../screens/editProductScreen/EditProductScreen.strings';
import {validateProduct} from '../utils/validation';

export const useEditProduct = (productId: string, navigation: any) => {
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
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const newDateRevision = new Date(dateRelease);
    newDateRevision.setFullYear(dateRelease.getFullYear() + 1);
    setDateRevision(newDateRevision);
  }, [dateRelease]);

  const validateFields = useCallback(async () => {
    const updatedProduct: Product = {
      id,
      name,
      description,
      logo,
      date_release: dateRelease.toISOString().split('T')[0],
      date_revision: dateRevision.toISOString().split('T')[0],
    };

    const {valid, errors} = await validateProduct(updatedProduct);
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

    if (valid && product) {
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

  return {
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
  };
};
