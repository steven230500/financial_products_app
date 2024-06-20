import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Product} from '../../../src/models/Product';
import {ProductList} from '../../../src/components/organisms';

describe('ProductList', () => {
  const products: Product[] = [
    {
      id: '1',
      name: 'Product 1',
      description: '',
      logo: '',
      date_release: '',
      date_revision: '',
    },
    {
      id: '2',
      name: 'Product 2',
      description: '',
      logo: '',
      date_release: '',
      date_revision: '',
    },
    {
      id: '3',
      name: 'Product 3',
      description: '',
      logo: '',
      date_release: '',
      date_revision: '',
    },
  ];

  const onProductPress = jest.fn();

  it('should render all products', () => {
    const {getByText} = render(
      <ProductList products={products} onProductPress={onProductPress} />,
    );

    products.forEach(product => {
      expect(getByText(product.name)).toBeTruthy();
    });
  });

  it('should call onProductPress when a product is pressed', () => {
    const {getByText} = render(
      <ProductList products={products} onProductPress={onProductPress} />,
    );

    const productItem = getByText('Product 1');
    fireEvent.press(productItem);

    expect(onProductPress).toHaveBeenCalledWith('1');
  });
});
