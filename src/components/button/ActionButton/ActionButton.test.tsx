import ActionButton, { ActionButtonPropsType } from './ActionButton';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Primary Button Props Test', () => {
  test('If button rendered correctly', () => {
    const props: ActionButtonPropsType = {
      icon: 'icon.png',
      onClick: () => {}
    };

    const element = render(<ActionButton {...props} />);

    expect(element).toMatchSnapshot();
  });

  test('If disabled button rendered correctly', () => {
    const props: ActionButtonPropsType = {
      icon: 'icon.png',
      isDisabled: true,
      onClick: () => {}
    };

    const element = render(<ActionButton {...props} />);

    expect(element).toMatchSnapshot();
  });

  test('If icon rendered correctly', () => {
    const props: ActionButtonPropsType = {
      icon: 'icon.png',
      onClick: () => {}
    };

    render(<ActionButton {...props} />);
    const element = screen.getByTestId('action-button-test');

    expect(element).toHaveAttribute('src', '/assets/icons/icon.png');
  });

  test('If onClick called', () => {
    const onClick = jest.fn();
    const props: ActionButtonPropsType = {
      icon: 'icon.png',
      onClick
    };

    render(<ActionButton {...props} />);
    const element = screen.getByTestId('action-button-test');

    element.click();
    expect(onClick).toBeCalled();
  });
});
