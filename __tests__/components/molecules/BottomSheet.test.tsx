import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {BottomSheet} from '../../../src/components/molecules';

describe('BottomSheet', () => {
  it('should render correctly', () => {
    const {getByTestId} = render(
      <BottomSheet visible={true} onClose={() => {}}>
        <></>
      </BottomSheet>,
    );
    expect(getByTestId('bottom-sheet')).toBeTruthy();
  });

  it('should call onClose when overlay is pressed', () => {
    const onCloseMock = jest.fn();
    const {getByTestId} = render(
      <BottomSheet visible={true} onClose={onCloseMock}>
        <></>
      </BottomSheet>,
    );
    fireEvent.press(getByTestId('overlay'));
    expect(onCloseMock).toHaveBeenCalled();
  });
});
