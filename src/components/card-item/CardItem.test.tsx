import CardItem, { CardItemPropsType } from './CardItem';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Card Props Test', () => {
  test('If card rendered correctly', () => {
    const props: CardItemPropsType = {
      label: 'card-item',
      value: 'card-value',
      isStatus: false,
      filePath: ''
    };

    const element = render(<CardItem {...props} />);

    expect(element).toMatchSnapshot();
  });

  test('If card status rendered correctly', () => {
    const props: CardItemPropsType = {
      label: 'card-item',
      value: 'card-value',
      isStatus: true,
      filePath: ''
    };

    const element = render(<CardItem {...props} />);

    expect(element).toMatchSnapshot();
  });

  test('If card file rendered correctly and file click works', () => {
    const props: CardItemPropsType = {
      label: 'card-item',
      value: 'card-value',
      isStatus: false,
      filePath: 'file'
    };

    const element = render(<CardItem {...props} />);
    const ClickElement = screen.getByTestId('card-file-test');

    window.open = jest.fn();
    ClickElement.click();
    expect(element).toMatchSnapshot();
  });
});
