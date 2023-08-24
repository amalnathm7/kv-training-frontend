import Card from '../../components/card/Card';
import HomeLayout from '../../layouts/home-layout/HomeLayout';
import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetEmployeeByIdQuery } from '../../services/employeeApi';
import { RouteConstants } from '../../constants/routeConstants';
import { AuthorizationContext } from '../../app';
const EmployeeDetailsPage: React.FC = () => {
  const { isSuperAuthorized } = useContext(AuthorizationContext);

  const { id } = useParams();
  const navigate = useNavigate();

  const { data: employeeData, isSuccess } = useGetEmployeeByIdQuery(id);

  let items = [];

  if (isSuccess) {
    const employee = employeeData.data;

    items = [
      {
        label: 'Employee Code',
        value: employee.employeeCode
      },
      {
        label: 'Name',
        value: employee.name
      },
      {
        label: 'Email',
        value: employee.email
      },
      {
        label: 'Phone',
        value: employee.phone
      },
      {
        label: 'Joining Date',
        value: new Date(employee.joiningDate).toISOString().split('T')[0]
      },
      {
        label: 'Role',
        value: employee.role ? employee.role.role : 'NIL'
      },
      {
        label: 'Department',
        value: employee.department ? employee.department.name : 'NIL'
      },
      {
        label: 'Status',
        value: employee.status,
        isStatus: true
      },
      {
        label: 'Experience',
        value: employee.experience + ' Years'
      },
      {
        label: 'Address',
        value:
          employee.address.line1 +
          ', ' +
          employee.address.line2 +
          ', ' +
          employee.address.city +
          ', ' +
          employee.address.state +
          ', ' +
          employee.address.country +
          ', ' +
          employee.address.pincode
      }
    ];
  }

  const onEditClicked = () => {
    navigate(`${RouteConstants.employee}/${id}/edit`);
  };

  return (
    <HomeLayout
      subHeaderPrimaryAction={isSuperAuthorized ? onEditClicked : null}
      subHeaderLabel='Employee Details'
      subHeaderPrimaryActionLabel={isSuperAuthorized ? 'Edit' : ''}
      subHeaderPrimaryActionIcon={isSuperAuthorized ? 'edit.svg' : ''}
    >
      <Card items={items}></Card>
    </HomeLayout>
  );
};

export default EmployeeDetailsPage;
