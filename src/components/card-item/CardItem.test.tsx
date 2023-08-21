import CardItem, { CardItemPropsType } from './CardItem';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Card Props Test', () => {
  test('If card rendered correctly', () => {
    const props: CardItemPropsType = {
      label: 'card-item',
      value: 'card-value',
      isStatus: true
    };

    const element = render(<CardItem {...props} />);

    expect(element).toMatchSnapshot();
  });

  test('If card status active rendered correctly', () => {
    const props: CardItemPropsType = {
      label: 'card-item',
      value: 'Active',
      isStatus: true
    };

    const element = render(<CardItem {...props} />);

    expect(element).toMatchSnapshot();
  });

  test('If card status inactive rendered correctly', () => {
    const props: CardItemPropsType = {
      label: 'card-item',
      value: 'Inactive',
      isStatus: true
    };

    const element = render(<CardItem {...props} />);

    expect(element).toMatchSnapshot();
  });

  test('If card status probation rendered correctly', () => {
    const props: CardItemPropsType = {
      label: 'card-item',
      value: 'Inactive',
      isStatus: true
    };

    const element = render(<CardItem {...props} />);

    expect(element).toMatchSnapshot();
  });
});
