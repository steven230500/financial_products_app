import React from 'react';
import {render} from '@testing-library/react-native';
import {SkeletonLoader} from '../../../src/components/atoms';

describe('SkeletonLoader', () => {
  it('should render correctly', () => {
    const {getByTestId} = render(
      <SkeletonLoader width={100} height={100} testID="skeleton-loader" />,
    );
    expect(getByTestId('skeleton-loader')).toBeTruthy();
  });
});
