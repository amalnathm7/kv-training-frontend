import Pagination, { PaginationPropsType } from './Pagination';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Pagination Props Test', () => {
  test('If pagination rendered correctly', () => {
    const props: PaginationPropsType = {
      page: 1,
      length: 10,
      total: 25,
      setPage: () => {}
    };

    const element = render(
      <table>
        <tbody>
          <tr>
            <Pagination {...props} />
          </tr>
        </tbody>
      </table>
    );

    expect(element).toMatchSnapshot();
  });
  test('If pagination rendered correctly after page was set 0 and total became greater than 0', () => {
    const props: PaginationPropsType = {
      page: 0,
      length: 10,
      total: 25,
      setPage: () => {}
    };

    const element = render(
      <table>
        <tbody>
          <tr>
            <Pagination {...props} />
          </tr>
        </tbody>
      </table>
    );

    expect(element).toMatchSnapshot();
  });

  test('If pagination next button clicks', () => {
    const setPage = jest.fn((value: number) => ({ value }));

    const props: PaginationPropsType = {
      page: 1,
      length: 10,
      total: 25,
      setPage
    };

    render(
      <table>
        <tbody>
          <tr>
            <Pagination {...props} />
          </tr>
        </tbody>
      </table>
    );
    const element = screen.getByTestId('pagination-next-test');

    element.click();
    expect(setPage).toBeCalled();
  });

  test('If pagination back button clicks', () => {
    const setPage = jest.fn((value: number) => ({ value }));

    const props: PaginationPropsType = {
      page: 2,
      length: 10,
      total: 25,
      setPage
    };

    render(
      <table>
        <tbody>
          <tr>
            <Pagination {...props} />
          </tr>
        </tbody>
      </table>
    );
    const element = screen.getByTestId('pagination-back-test');

    element.click();
    expect(setPage).toBeCalled();
  });

  test('If pagination page input changes', () => {
    const setPage = jest.fn((value: number) => ({ value }));

    const props: PaginationPropsType = {
      page: 1,
      length: 10,
      total: 25,
      setPage
    };

    render(
      <table>
        <tbody>
          <tr>
            <Pagination {...props} />
          </tr>
        </tbody>
      </table>
    );
    const element = screen.getByTestId('pagination-page-number-test');

    fireEvent.change(element, { target: { value: '2' } });
    expect(setPage).toBeCalled();
  });

  test('If pagination page input changes with no value', () => {
    const setPage = jest.fn((value: number) => ({ value }));

    const props: PaginationPropsType = {
      page: 1,
      length: 10,
      total: 25,
      setPage
    };

    render(
      <table>
        <tbody>
          <tr>
            <Pagination {...props} />
          </tr>
        </tbody>
      </table>
    );
    const element = screen.getByTestId('pagination-page-number-test');

    fireEvent.blur(element, { target: { value: '' } });
    expect(setPage).toBeCalled();
  });

  test('If pagination page input changes with value greater than totalPages', () => {
    const setPage = jest.fn((value: number) => ({ value }));

    const props: PaginationPropsType = {
      page: 1,
      length: 10,
      total: 25,
      setPage
    };

    render(
      <table>
        <tbody>
          <tr>
            <Pagination {...props} />
          </tr>
        </tbody>
      </table>
    );
    const element = screen.getByTestId('pagination-page-number-test');

    fireEvent.blur(element, { target: { value: 100 } });
    expect(setPage).toBeCalled();
  });

  test('If pagination page input changes with value less than 1', () => {
    const setPage = jest.fn((value: number) => ({ value }));

    const props: PaginationPropsType = {
      page: 1,
      length: 10,
      total: 25,
      setPage
    };

    render(
      <table>
        <tbody>
          <tr>
            <Pagination {...props} />
          </tr>
        </tbody>
      </table>
    );
    const element = screen.getByTestId('pagination-page-number-test');

    fireEvent.blur(element, { target: { value: -100 } });
    expect(setPage).toBeCalled();
  });

  test('If pagination page input blurs', () => {
    const setPage = jest.fn((value: number) => ({ value }));

    const props: PaginationPropsType = {
      page: 1,
      length: 10,
      total: 25,
      setPage
    };

    render(
      <table>
        <tbody>
          <tr>
            <Pagination {...props} />
          </tr>
        </tbody>
      </table>
    );
    const element = screen.getByTestId('pagination-page-number-test');

    element.focus();
    element.blur();
    expect(setPage).toBeCalled();
  });

  test('If pagination page input pressed enter key', () => {
    const setPage = jest.fn((value: number) => ({ value }));

    const props: PaginationPropsType = {
      page: 1,
      length: 10,
      total: 25,
      setPage
    };

    render(
      <table>
        <tbody>
          <tr>
            <Pagination {...props} />
          </tr>
        </tbody>
      </table>
    );
    const element = screen.getByTestId('pagination-page-number-test');

    fireEvent.keyUp(element, { code: 'Enter' });
    expect(setPage).toBeCalled();
  });

  test('If pagination rendered correctly without list', () => {
    const setPage = jest.fn((value: number) => ({ value }));

    const props: PaginationPropsType = {
      page: 1,
      length: 0,
      total: 0,
      setPage
    };

    const element = render(
      <table>
        <tbody>
          <tr>
            <Pagination {...props} />
          </tr>
        </tbody>
      </table>
    );

    expect(element).toMatchSnapshot();
  });
});
