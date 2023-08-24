import { useNavigate, useParams } from 'react-router-dom';
import EmployeeForm from '../../components/form/EmployeeForm';
import HomeLayout from '../../layouts/home-layout/HomeLayout';
import React, { useContext, useEffect, useState } from 'react';
import { useGetEmployeeByIdQuery } from '../../services/employeeApi';
import { RouteConstants } from '../../constants/routeConstants';
import { AuthorizationContext } from '../../app';

const EmployeeEditPage: React.FC = () => {
  const { isSuperAuthorized } = useContext(AuthorizationContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSuperAuthorized) navigate(`${RouteConstants.employee}`, { replace: true });
  });

  const { id } = useParams();

  const { data: employeesData, isSuccess: isEmployeeFetchSuccess } = useGetEmployeeByIdQuery(id);

  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    if (isEmployeeFetchSuccess) setEmployee(employeesData.data);
  }, [isEmployeeFetchSuccess]);

  return (
    <HomeLayout
      subHeaderPrimaryAction={null}
      subHeaderLabel='Edit Employee'
      subHeaderPrimaryActionLabel=''
      subHeaderPrimaryActionIcon=''
    >
      <EmployeeForm employee={employee} isEdit={true} />
    </HomeLayout>
  );
};

export default EmployeeEditPage;
