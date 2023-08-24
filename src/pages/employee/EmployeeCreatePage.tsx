import EmployeeForm from '../../components/form/EmployeeForm';
import HomeLayout from '../../layouts/home-layout/HomeLayout';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from '../../constants/routeConstants';
import { AuthorizationContext } from '../../app';

const EmployeeCreatePage: React.FC = () => {
  const { isSuperAuthorized } = useContext(AuthorizationContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSuperAuthorized) navigate(`${RouteConstants.employee}`);
  });

  return (
    <HomeLayout
      subHeaderPrimaryAction={() => {}}
      subHeaderLabel='Create Employee'
      subHeaderPrimaryActionLabel=''
      subHeaderPrimaryActionIcon=''
    >
      <EmployeeForm employee={null} isEdit={false} />
    </HomeLayout>
  );
};

export default EmployeeCreatePage;
