import React from 'react';
import {render} from '@testing-library/react-native';
import {HeaderTitle} from '../../../src/components/molecules';

describe('HeaderTitle', () => {
  it('should render correctly', () => {
    const {getByText, getByTestId} = render(<HeaderTitle />);
    expect(getByTestId('header-icon')).toBeTruthy();
    expect(getByText('Banco')).toBeTruthy();
  });
});
