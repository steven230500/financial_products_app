import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {SearchBar} from '../../../src/components/molecules';

describe('SearchBar', () => {
  it('should render correctly', () => {
    const {getByPlaceholderText} = render(
      <SearchBar value="" onChangeText={() => {}} />,
    );
    expect(getByPlaceholderText('Search...')).toBeTruthy();
  });

  it('should call onChangeText when text changes', () => {
    const onChangeTextMock = jest.fn();
    const {getByPlaceholderText} = render(
      <SearchBar value="" onChangeText={onChangeTextMock} />,
    );
    fireEvent.changeText(getByPlaceholderText('Search...'), 'test');
    expect(onChangeTextMock).toHaveBeenCalledWith('test');
  });
});
