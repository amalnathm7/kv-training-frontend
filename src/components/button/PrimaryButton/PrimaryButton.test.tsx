import PrimaryButton, { PrimaryButtonPropsType } from './PrimaryButton';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Primary Button Props Test', () => {
  test('If button rendered correctly', () => {
    const props: PrimaryButtonPropsType = {
      type: 'button',
      label: 'Button',
      onClick: () => {},
      style: {}
    };

    const element = render(<PrimaryButton {...props} />);

    expect(element).toMatchSnapshot();
  });

  test('If label rendered correctly', () => {
    const props: PrimaryButtonPropsType = {
      type: 'button',
      label: 'Button',
      onClick: () => {}
    };

    render(<PrimaryButton {...props} />);
    const element = screen.getByTestId('primary-button-test');

    expect(element).toHaveValue('Button');
  });

  test('If type rendered correctly', () => {
    const props: PrimaryButtonPropsType = {
      type: 'button',
      label: 'Button',
      onClick: () => {}
    };

    render(<PrimaryButton {...props} />);
    const element = screen.getByTestId('primary-button-test');

    // expect(element.getAttribute("type")).not.toBe("submit");
    expect(element).toHaveAttribute('type', 'button');
  });

  test('If onClick called', () => {
    const onClick = jest.fn();
    const props: PrimaryButtonPropsType = {
      type: 'button',
      label: 'Button',
      onClick
    };

    render(<PrimaryButton {...props} />);
    const element = screen.getByTestId('primary-button-test');

    fireEvent.click(element);
    element.click();
    expect(onClick).toBeCalledTimes(2);
  });
});
