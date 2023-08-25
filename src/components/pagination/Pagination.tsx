import React, { useEffect } from 'react';
import './Pagination.css';
import { PAGE_LENGTH } from '../../constants/apiConstants';

export type PaginationPropsType = {
  page: number;
  length: number;
  total: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination: React.FC<PaginationPropsType> = (props) => {
  const totalPages = Math.ceil(props.total / PAGE_LENGTH);

  useEffect(() => {
    if (props.total === 0) props.setPage(0);
    else if (props.page === 0) props.setPage(1);
  }, [props.total, props.page]);

  const onChangePage = (event) => {
    props.setPage(event.target.value);
  };

  const setPageValue = (value) => {
    if (value === '') props.setPage(1);
    else if (value > totalPages) props.setPage(totalPages);
    else if (value < 1) props.setPage(1);
    else props.setPage(Number(value));
  };

  const onBlur = (event) => {
    setPageValue(event.target.value);
  };

  const onKeyUp = (event) => {
    if (event.code === 'Enter') {
      setPageValue(event.target.value);
      event.target.blur();
    }
  };

  const onNextClicked = () => {
    props.setPage(props.page + 1);
  };

  const onBackClicked = () => {
    props.setPage(props.page - 1);
  };

  return (
    <td>
      {typeof props.page !== 'string' && props.page > 1 && (
        <button
          onClick={onBackClicked}
          className='pagination-button'
          data-testid='pagination-back-test'
        >
          <u>Back</u>
        </button>
      )}
      <label style={{ marginRight: '10px' }}>{`Showing ${props.length} entries in page`}</label>
      <input
        type='number'
        onBlur={onBlur}
        onKeyUp={onKeyUp}
        className='pagination-page-number'
        value={props.page}
        onChange={onChangePage}
        data-testid='pagination-page-number-test'
      ></input>
      <label>{` of ${totalPages}`}</label>
      {typeof props.page !== 'string' && props.page < totalPages && (
        <button
          onClick={onNextClicked}
          className='pagination-button'
          data-testid='pagination-next-test'
        >
          <u>Next</u>
        </button>
      )}
    </td>
  );
};

export default Pagination;
