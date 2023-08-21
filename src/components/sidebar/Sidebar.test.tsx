import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Sidebar from './Sidebar';
import { Router } from 'react-router-dom';

describe('Sidebar Props Test', () => {
  test('If Sidebar rendered correctly', () => {
    const element = render(
      <Router location={''} navigator={undefined}>
        <Sidebar />
      </Router>
    );

    expect(element).toMatchSnapshot();
  });
});
