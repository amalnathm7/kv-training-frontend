import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import DropDown, { DropDownPropsType } from './DropDown';

describe('Dropdown Props Test', () => {
  test('If dropdown rendered correctly', () => {
    const props: DropDownPropsType = {
      value: 'dropdown-value',
      onChange: () => {},
      label: 'dropdown-label',
      placeholder: 'dropdown-placeholder',
      showError: false,
      options: ['option 1', 'option 2']
    };

    const element = render(<DropDown {...props} />);

    expect(element).toMatchSnapshot();
  });

  test('If dropdown rendered correctly with error', () => {
    const props: DropDownPropsType = {
      value: 'dropdown-value',
      onChange: () => {},
      label: 'dropdown-label',
      placeholder: 'dropdown-placeholder',
      showError: true,
      options: ['option 1', 'option 2']
    };

    const element = render(<DropDown {...props} />);

    expect(element).toMatchSnapshot();
  });
});
