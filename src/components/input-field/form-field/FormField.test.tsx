import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormField, { FormFieldPropsType } from './FormField';

describe('FormField Props Test', () => {
  test('If FormField rendered correctly', () => {
    const props: FormFieldPropsType = {
      value: 'FormField-value',
      onChange: () => {},
      label: 'FormField-label',
      placeholder: 'FormField-placeholder',
      showError: false,
      disabled: false,
      type: 'text'
    };

    const element = render(<FormField {...props} />);

    expect(element).toMatchSnapshot();
  });

  test('If FormField rendered correctly with error', () => {
    const props: FormFieldPropsType = {
      value: 'FormField-value',
      onChange: () => {},
      label: 'FormField-label',
      placeholder: 'FormField-placeholder',
      showError: true,
      disabled: false,
      type: 'text'
    };

    const element = render(<FormField {...props} />);

    expect(element).toMatchSnapshot();
  });

  test('If FormField rendered correctly with no label', () => {
    const props: FormFieldPropsType = {
      value: 'FormField-value',
      onChange: () => {},
      label: '',
      placeholder: 'FormField-placeholder',
      showError: false,
      disabled: false,
      type: 'text'
    };

    const element = render(<FormField {...props} />);

    expect(element).toMatchSnapshot();
  });

  test('If FormField rendered correctly with error and no label', () => {
    const props: FormFieldPropsType = {
      value: 'FormField-value',
      onChange: () => {},
      label: '',
      placeholder: 'FormField-placeholder',
      showError: true,
      disabled: false,
      type: 'text'
    };

    const element = render(<FormField {...props} />);

    expect(element).toMatchSnapshot();
  });

  test('If disabled FormField rendered correctly', () => {
    const props: FormFieldPropsType = {
      value: 'FormField-value',
      onChange: () => {},
      label: '',
      placeholder: 'FormField-placeholder',
      showError: false,
      disabled: true,
      type: 'text'
    };

    const element = render(<FormField {...props} />);

    expect(element).toMatchSnapshot();
  });
});
