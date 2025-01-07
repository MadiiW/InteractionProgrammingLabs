import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {PasswordStrengthmeter} from './../components/PasswordStrengthmeter';

// test by running npm test
describe('PasswordStrengthmeter', () => {
  const renderComponent = (props = {}) => {
    return render(<PasswordStrengthmeter {...props} />);
  };

  it('renders with default title and correct placeholder in input field', () => {
    const {getByText, getByPlaceholderText} = renderComponent();
    expect(getByText('Choose your password')).toBeTruthy();
    expect(getByPlaceholderText('Enter your password')).toBeTruthy();
  });

  it('renders with custom title', () => {
    const {getByText} = renderComponent({title: 'Custom Title'});
    expect(getByText('Custom Title')).toBeTruthy();
  });

  describe('Different Password Strengths', () => {
    it('starts with "Too short"', () => {
      const {getByText} = renderComponent();
      expect(getByText('Too short')).toBeTruthy();
    });

    it('"Too short" for passwords shorter than minimum length', () => {
      const {getByPlaceholderText, getByText} = renderComponent();
      const input = getByPlaceholderText('Enter your password');
      fireEvent.changeText(input, 'short1!');
      expect(getByText('Too short')).toBeTruthy();
    });

    it('"Too weak" for passwords satisfying minimum length but no other constraints', () => {
      const {getByPlaceholderText, getByText} = renderComponent();
      const input = getByPlaceholderText('Enter your password');
      fireEvent.changeText(input, 'shortshort');
      expect(getByText('Too weak')).toBeTruthy();
    });

    it('"Very weak" for passwords satisfying only 1 constraint and min length', () => {
      const {getByPlaceholderText, getByText} = renderComponent();
      const input = getByPlaceholderText('Enter your password');
      fireEvent.changeText(input, 'prettylongpassword'); // length of 18
      expect(getByText('Very weak')).toBeTruthy();
    });

    it('"Weak" for passwords satisfying 2 constraints and min length', () => {
      const {getByPlaceholderText, getByText} = renderComponent();
      const input = getByPlaceholderText('Enter your password');
      fireEvent.changeText(input, 'Password123');
      expect(getByText('Weak')).toBeTruthy();
    });

    it('"Good" for passwords satisfying 3 constraints and min length', () => {
      const {getByPlaceholderText, getByText} = renderComponent();
      const input = getByPlaceholderText('Enter your password');
      fireEvent.changeText(input, 'This?IsGood12!');
      expect(getByText('Good')).toBeTruthy();
    });

    it('"Strong" for passwords satisfying all the constraints', () => {
      const {getByPlaceholderText, getByText} = renderComponent();
      const input = getByPlaceholderText('Enter your password');
      fireEvent.changeText(input, '!Very1Strong2Password3!@');
      expect(getByText('Strong')).toBeTruthy();
    });
  });

  describe('Explanation Toggle', () => {
    it('toggling explanation works', () => {
      const {getByTestId, queryByText} = renderComponent();
      const questionButton = getByTestId('questionMarkButton');

      expect(queryByText(/Your password needs at least/)).toBeNull();
      fireEvent.press(questionButton);
      expect(queryByText(/Your password needs at least/)).toBeTruthy();
      fireEvent.press(questionButton);
      expect(queryByText(/Your password needs at least/)).toBeNull();
    });
  });

  describe('Custom Props', () => {
    it('respects custom minimum and preferred password lengths', () => {
      const {getByPlaceholderText, getByText} = renderComponent({
        minPasswordLength: 5,
        preferredPasswordLength: 12,
      });

      const input = getByPlaceholderText('Enter your password');

      fireEvent.changeText(input, 'four');
      expect(getByText('Too short')).toBeTruthy();

      fireEvent.changeText(input, 'Valid5!');
      expect(getByText('Good')).toBeTruthy();

      fireEvent.changeText(input, 'ValidPassword5!');
      expect(getByText('Strong')).toBeTruthy();
    });
  });
});
