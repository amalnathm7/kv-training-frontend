import EmployeeForm from '../../components/form/EmployeeForm';
import HomeLayout from '../../layouts/home-layout/HomeLayout';
import React, { useContext, useEffect } from 'react';

import { PermissionLevel } from '../../utils/PermissionLevel';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from '../../constants/routeConstants';
import { SelectedContext } from '../../app';

const EmployeeCreatePage: React.FC = () => {
  const { myProfile } = useContext(SelectedContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (myProfile.role?.permissionLevel !== PermissionLevel.SUPER)
      navigate(`${RouteConstants.employee}`);
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
