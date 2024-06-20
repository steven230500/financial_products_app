import React from 'react';
import {render} from '@testing-library/react-native';
import {SkeletonItem} from '../../../src/components/molecules';

describe('SkeletonItem', () => {
  it('should render correctly', () => {
    const {getByTestId} = render(<SkeletonItem />);
    expect(getByTestId('skeleton-loader')).toBeTruthy();
    expect(getByTestId('skeleton-loader-text1')).toBeTruthy();
    expect(getByTestId('skeleton-loader-text2')).toBeTruthy();
  });
});
