import React, { useEffect, useState } from 'react';
import './Listing.css';
import EmployeeListItem from '../list-item/EmployeeListItem';
import { useGetEmployeeListQuery } from '../../services/employeeApi';

type EmployeeListingPropsType = {
  labels: string[];
};

const EmployeeListing: React.FC<EmployeeListingPropsType> = (props) => {
  const { data: employeesData, isSuccess: isEmployeesFetchSuccess } = useGetEmployeeListQuery();

  const labels = props.labels.map((label) => (
    <td className='listing-label' key={label}>
      <label>{label}</label>
    </td>
  ));

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    if (isEmployeesFetchSuccess)
      setEmployees(
        employeesData.data.map((employee) => (
          <EmployeeListItem key={employee.id} employee={employee}></EmployeeListItem>
        ))
      );
  }, [isEmployeesFetchSuccess]);

  return (
    <div className='listing'>
      <table>
        <thead>
          <tr className='list-header'>{labels}</tr>
        </thead>
        <tbody className='list-items'>{employees}</tbody>
      </table>
    </div>
  );
};

export default EmployeeListing;
