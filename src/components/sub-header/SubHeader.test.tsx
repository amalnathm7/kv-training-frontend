import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import SubHeader, { SubHeaderPropsType } from './SubHeader';

describe('SubHeader Props Test', () => {
  test('If SubHeader rendered correctly', () => {
    const props: SubHeaderPropsType = {
      label: 'SubHeader-label',
      primaryActionLabel: '',
      primaryActionIcon: '',
      primaryAction: null
    };

    const element = render(<SubHeader {...props} />);

    expect(element).toMatchSnapshot();
  });

  test('If SubHeader rendered correctly with primary action', () => {
    const props: SubHeaderPropsType = {
      label: 'SubHeader-label',
      primaryActionLabel: 'SubHeader-action-label',
      primaryActionIcon: 'SubHeader-action-icon.png',
      primaryAction: () => {}
    };

    const element = render(<SubHeader {...props} />);

    expect(element).toMatchSnapshot();
  });

  test('If SubHeader rendered correctly with primary and secondary actions', () => {
    const props: SubHeaderPropsType = {
      label: 'SubHeader-label',
      primaryActionLabel: 'SubHeader-action-label',
      primaryActionIcon: 'SubHeader-action-icon.png',
      primaryAction: () => {},
      secondaryActionLabel: 'SubHeader-action-label',
      secondaryActionIcon: 'SubHeader-action-icon',
      secondaryAction: () => {}
    };

    const element = render(<SubHeader {...props} />);

    expect(element).toMatchSnapshot();
  });
});
