import React from 'react';
import {render} from '@testing-library/react-native';
import {SkeletonList} from '../../../src/components/organisms';

describe('SkeletonList', () => {
  it('should render 5 skeleton loaders', () => {
    const {getAllByTestId} = render(<SkeletonList />);
    expect(getAllByTestId('skeleton-loader')).toHaveLength(5);
  });
});
