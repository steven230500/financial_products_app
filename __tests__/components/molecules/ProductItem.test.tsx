import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Product} from '../../../src/models/Product';
import {ProductItem} from '../../../src/components/molecules';

const product: Product = {
  id: '1',
  name: 'Test Product',
  description: 'Test Description',
  logo: 'test-logo.png',
  date_release: '2024-06-20',
  date_revision: '2025-06-20',
};

describe('ProductItem', () => {
  it('should render correctly', () => {
    const {getByText} = render(
      <ProductItem product={product} onPress={() => {}} />,
    );
    expect(getByText('Test Product')).toBeTruthy();
    expect(getByText('ID: 1')).toBeTruthy();
  });

  it('should call onPress when pressed', () => {
    const onPressMock = jest.fn();
    const {getByTestId} = render(
      <ProductItem product={product} onPress={onPressMock} />,
    );
    fireEvent.press(getByTestId('product-item'));
    expect(onPressMock).toHaveBeenCalled();
  });
});
