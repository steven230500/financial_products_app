import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {TextInputField} from '../../../src/components/atoms';

describe('TextInputField', () => {
  it('should render correctly', () => {
    const {getByTestId} = render(
      <TextInputField
        placeholder="Test"
        value=""
        onChangeText={() => {}}
        testID="text-input-field"
      />,
    );
    expect(getByTestId('text-input-field')).toBeTruthy();
  });

  it('should call onChangeText when text changes', () => {
    const onChangeTextMock = jest.fn();
    const {getByTestId} = render(
      <TextInputField
        placeholder="Test"
        value=""
        onChangeText={onChangeTextMock}
        testID="text-input-field"
      />,
    );
    fireEvent.changeText(getByTestId('text-input-field'), 'new text');
    expect(onChangeTextMock).toHaveBeenCalledWith('new text');
  });
});
