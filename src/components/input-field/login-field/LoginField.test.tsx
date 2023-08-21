import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginField, { LoginFieldPropsType } from './LoginField';

describe('LoginField Props Test', () => {
  test('If LoginField rendered correctly for username', () => {
    const props: LoginFieldPropsType = {
      value: 'LoginField-value',
      onChange: () => {},
      label: 'LoginField-label',
      showError: false,
      type: 'text'
    };

    const element = render(<LoginField {...props} />);

    expect(element).toMatchSnapshot();
  });

  test('If LoginField rendered correctly for password', () => {
    const props: LoginFieldPropsType = {
      value: 'LoginField-value',
      onChange: () => {},
      label: 'LoginField-label',
      showError: false,
      type: 'password'
    };

    const element = render(<LoginField {...props} />);

    expect(element).toMatchSnapshot();
  });

  test('If LoginField rendered correctly for username with error', () => {
    const props: LoginFieldPropsType = {
      value: 'LoginField-value',
      onChange: () => {},
      label: 'LoginField-label',
      showError: true,
      type: 'text'
    };

    const element = render(<LoginField {...props} />);

    expect(element).toMatchSnapshot();
  });

  test('If LoginField rendered correctly for password with error', () => {
    const props: LoginFieldPropsType = {
      value: 'LoginField-value',
      onChange: () => {},
      label: 'LoginField-label',
      showError: true,
      type: 'password'
    };

    const element = render(<LoginField {...props} />);

    expect(element).toMatchSnapshot();
  });
});
