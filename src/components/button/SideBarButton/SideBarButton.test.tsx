import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SideBarButton, { SideBarButtonPropsType } from './SideBarButton';
import { BrowserRouter } from 'react-router-dom';

describe('Sidebar Button Props Test', () => {
  test('If sidebarbutton rendered correctly', () => {
    const props: SideBarButtonPropsType = {
      imgIcon: 'icon',
      headerText: 'text',
      isSelected: true,
      onClick: () => {}
    };

    const element = render(<SideBarButton {...props} />);

    expect(element).toMatchSnapshot();
  });

  test('If sidebarbutton unselected rendered correctly', () => {
    const props: SideBarButtonPropsType = {
      imgIcon: 'icon',
      headerText: 'text',
      isSelected: false,
      onClick: () => {}
    };

    const element = render(<SideBarButton {...props} />);

    expect(element).toMatchSnapshot();
  });

  test('If onClick called', () => {
    const onClick = jest.fn();
    const props: SideBarButtonPropsType = {
      imgIcon: 'icon',
      headerText: 'text',
      isSelected: true,
      onClick: onClick
    };

    render(
      <BrowserRouter>
        <SideBarButton {...props} />
      </BrowserRouter>
    );
    const element = screen.getByTestId('sidebar-button-test');

    element.click();
    expect(onClick).toBeCalled();
  });
});
