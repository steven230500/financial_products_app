import {verifyProductId} from './api';

export const validateProduct = async (product: {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
}) => {
  let valid = true;
  const errors: any = {};

  if (!product.id || product.id.length < 3 || product.id.length > 10) {
    errors.id = 'ID no válido';
    valid = false;
  } else {
    const idExists = await verifyProductId(product.id);
    if (idExists) {
      errors.id = 'ID ya existe';
      valid = false;
    }
  }

  if (!product.name || product.name.length < 5 || product.name.length > 100) {
    errors.name = 'Nombre no válido';
    valid = false;
  }

  if (
    !product.description ||
    product.description.length < 10 ||
    product.description.length > 200
  ) {
    errors.description = 'Descripción no válida';
    valid = false;
  }

  if (!product.logo) {
    errors.logo = 'Logo es requerido';
    valid = false;
  }

  const today = new Date().toISOString().split('T')[0];
  if (
    !product.date_release ||
    new Date(product.date_release) < new Date(today)
  ) {
    errors.date_release = 'Fecha de liberación no válida';
    valid = false;
  }

  if (
    !product.date_revision ||
    new Date(product.date_revision) <= new Date(product.date_release)
  ) {
    errors.date_revision = 'Fecha de revisión no válida';
    valid = false;
  }

  return {valid, errors};
};
