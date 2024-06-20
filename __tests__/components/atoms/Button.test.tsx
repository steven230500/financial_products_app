import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Button} from '../../../src/components/atoms';

describe('Button', () => {
  it('should render correctly', () => {
    const {getByTestId} = render(
      <Button title="Test Button" onPress={() => {}} testID="button" />,
    );
    expect(getByTestId('button')).toBeTruthy();
  });

  it('should call onPress when pressed', () => {
    const onPressMock = jest.fn();
    const {getByTestId} = render(
      <Button title="Test Button" onPress={onPressMock} testID="button" />,
    );
    fireEvent.press(getByTestId('button'));
    expect(onPressMock).toHaveBeenCalled();
  });
});
