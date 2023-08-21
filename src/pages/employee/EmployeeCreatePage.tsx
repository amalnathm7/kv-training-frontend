import EmployeeForm from '../../components/form/EmployeeForm';
import HomeLayout from '../../layouts/home-layout/HomeLayout';
import React, { useEffect } from 'react';
import { useGetMyProfileQuery } from '../../services/employeeApi';
import { PermissionLevel } from '../../utils/PermissionLevel';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from '../../constants/routeConstants';

const EmployeeCreatePage: React.FC = () => {
  const { data: myProfile, isSuccess: isMyProfileFetchSuccess } = useGetMyProfileQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (isMyProfileFetchSuccess && myProfile.data.role?.permissionLevel !== PermissionLevel.SUPER)
      navigate(`${RouteConstants.employee}`);
  }, [isMyProfileFetchSuccess]);

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
