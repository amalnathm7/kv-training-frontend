import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import SubHeader, { SubHeaderPropsType } from './SubHeader';

describe('SubHeader Props Test', () => {
  test('If SubHeader rendered correctly', () => {
    const props: SubHeaderPropsType = {
      label: 'SubHeader-label',
      primaryActionLabel: '',
      primaryActionIcon: '',
      primaryAction: null,
      filters: []
    };

    const element = render(<SubHeader {...props} />);

    expect(element).toMatchSnapshot();
  });

  test('If SubHeader rendered correctly with primary action', () => {
    const props: SubHeaderPropsType = {
      label: 'SubHeader-label',
      primaryActionLabel: 'SubHeader-action-label',
      primaryActionIcon: 'SubHeader-action-icon.png',
      primaryAction: () => {},
      filters: []
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
      secondaryAction: () => {},
      filters: []
    };

    const element = render(<SubHeader {...props} />);

    expect(element).toMatchSnapshot();
  });

  test('If SubHeader rendered correctly with search field', () => {
    const props: SubHeaderPropsType = {
      label: 'SubHeader-label',
      primaryActionLabel: 'Search',
      primaryActionIcon: 'SubHeader-action-icon.png',
      primaryAction: () => {},
      secondaryActionLabel: 'SubHeader-action-label',
      secondaryActionIcon: 'SubHeader-action-icon',
      secondaryAction: () => {},
      filters: [],
      primaryActionPlaceholder: 'Subheader-placeholder',
      primaryActionValue: 'Subheader-value'
    };

    const element = render(<SubHeader {...props} />);

    expect(element).toMatchSnapshot();
  });

  test('If SubHeader rendered correctly with primary filter options', () => {
    const props: SubHeaderPropsType = {
      label: 'SubHeader-label',
      primaryActionLabel: 'SubHeader-action-label',
      primaryActionIcon: 'SubHeader-action-icon.png',
      primaryAction: () => {},
      secondaryActionLabel: 'SubHeader-action-label',
      secondaryActionIcon: 'SubHeader-action-icon',
      secondaryAction: () => {},
      filters: [
        {
          options: ['filter 1', 'filter 2'],
          action: () => {},
          placeholder: 'Subheader-placeholder'
        }
      ],
      primaryActionPlaceholder: 'Subheader-placeholder',
      primaryActionValue: 'Subheader-value'
    };

    const element = render(<SubHeader {...props} />);

    expect(element).toMatchSnapshot();
  });

  test('If SubHeader rendered correctly with primary and secondary filter options', () => {
    const props: SubHeaderPropsType = {
      label: 'SubHeader-label',
      primaryActionLabel: 'SubHeader-action-label',
      primaryActionIcon: 'SubHeader-action-icon.png',
      primaryAction: () => {},
      secondaryActionLabel: 'SubHeader-action-label',
      secondaryActionIcon: 'SubHeader-action-icon',
      secondaryAction: () => {},
      filters: [
        {
          options: ['filter 1', 'filter 2'],
          action: () => {},
          placeholder: 'Subheader-placeholder'
        },
        {
          options: ['filter 3', 'filter 4'],
          action: () => {},
          placeholder: 'Subheader-placeholder'
        }
      ],
      primaryActionPlaceholder: 'Subheader-placeholder',
      primaryActionValue: 'Subheader-value'
    };

    const element = render(<SubHeader {...props} />);

    expect(element).toMatchSnapshot();
  });
  test('If SubHeader rendered correctly with route options', () => {
    const props: SubHeaderPropsType = {
      label: 'SubHeader-label',
      primaryActionLabel: 'SubHeader-action-label',
      primaryActionIcon: 'SubHeader-action-icon.png',
      primaryAction: () => {},
      secondaryActionLabel: 'SubHeader-action-label',
      secondaryActionIcon: 'SubHeader-action-icon',
      secondaryAction: () => {},
      routeOptions: ['route 1', 'route 2'],
      onRouteChanged: () => {},
      filters: []
    };

    const element = render(<SubHeader {...props} />);

    expect(element).toMatchSnapshot();
  });
});
