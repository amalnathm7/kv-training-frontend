import HomeLayout from '../../layouts/home-layout/HomeLayout';
import React, { useEffect } from 'react';
import { useGetMyProfileQuery } from '../../services/employeeApi';
import { PermissionLevel } from '../../utils/PermissionLevel';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from '../../constants/routeConstants';
import OpeningForm from '../../components/form/OpeningForm';

const OpeningCreatePage: React.FC = () => {
  const { data: myProfile, isSuccess: isMyProfileFetchSuccess } = useGetMyProfileQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (isMyProfileFetchSuccess && myProfile.data.role?.permissionLevel !== PermissionLevel.SUPER)
      navigate(`${RouteConstants.opening}`);
  }, [isMyProfileFetchSuccess]);

  return (
    <HomeLayout
      subHeaderPrimaryAction={() => {}}
      subHeaderLabel='Create Opening'
      subHeaderPrimaryActionLabel=''
      subHeaderPrimaryActionIcon=''
    >
      <OpeningForm opening={null} isEdit={false} />
    </HomeLayout>
  );
};

export default OpeningCreatePage;
