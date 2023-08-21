import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SideBarButton, { SideBarButtonPropsType } from './SideBarButton';
import { RouteConstants } from '../../../constants/routeConstants';
import { BrowserRouter } from 'react-router-dom';

describe('Sidebar Button Props Test', () => {
  test('If sidebarbutton rendered correctly', () => {
    const props: SideBarButtonPropsType = {
      imgIcon: 'icon',
      headerText: 'text',
      route: RouteConstants.employee
    };

    const element = render(
      <BrowserRouter>
        <SideBarButton {...props} />
      </BrowserRouter>
    );

    expect(element).toMatchSnapshot();
  });

  test('If onClick called', () => {
    const props: SideBarButtonPropsType = {
      imgIcon: 'icon',
      headerText: 'text',
      route: RouteConstants.employee
    };

    render(
      <BrowserRouter>
        <SideBarButton {...props} />
      </BrowserRouter>
    );
    const element = screen.getByTestId('sidebar-button-test');

    element.click();
    expect(element).toMatchSnapshot();
  });
});
