import React, { useEffect, useState } from 'react';
import './Listing.css';
import EmployeeListItem from '../list-item/EmployeeListItem';
import { useLazyGetEmployeeListQuery } from '../../services/employeeApi';
import Pagination from '../pagination/Pagination';

type EmployeeListingPropsType = {
  labels: string[];
};

const EmployeeListing: React.FC<EmployeeListingPropsType> = (props) => {
  const [getEmployeesList, { data: employeesData, isLoading, isSuccess: isEmployeesFetchSuccess }] =
    useLazyGetEmployeeListQuery();
  const [page, setPage] = useState(1);

  const labels = props.labels.map((label) => (
    <td className='listing-label' key={label}>
      <label>{label}</label>
    </td>
  ));

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    if (isEmployeesFetchSuccess) {
      setEmployees(
        employeesData.data.map((employee) => (
          <EmployeeListItem key={employee.id} employee={employee}></EmployeeListItem>
        ))
      );
      setPage(employeesData.meta.offset + 1);
    }
  }, [isEmployeesFetchSuccess, employeesData]);

  useEffect(() => {
    if (typeof page !== 'string') getEmployeesList({ offset: page - 1 });
  }, [page]);

  return (
    <>
      <div className='listing-spacing'></div>
      <div className='listing'>
        <table>
          <thead>
            <tr className='list-header'>{labels}</tr>
            <tr className='list-pagination'>
              <Pagination
                page={page}
                setPage={setPage}
                length={employeesData?.meta.length}
                total={employeesData?.meta.total}
              />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {isLoading && (
                  <label style={{ alignItems: 'center', marginTop: '20px' }} className='list-items'>
                    Loading...
                  </label>
                )}
                {employees?.length === 0 && !isLoading && (
                  <label style={{ alignItems: 'center', marginTop: '20px' }} className='list-items'>
                    No Employees
                  </label>
                )}
              </td>
            </tr>
          </tbody>
          <tbody className='list-items'>{employees}</tbody>
        </table>
      </div>
    </>
  );
};

export default EmployeeListing;
