import HomeLayout from '../../layouts/home-layout/HomeLayout';
import React, { useContext, useEffect } from 'react';
import { PermissionLevel } from '../../utils/PermissionLevel';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from '../../constants/routeConstants';
import OpeningForm from '../../components/form/OpeningForm';
import { SelectedContext } from '../../app';

const OpeningCreatePage: React.FC = () => {
  const { myProfile } = useContext(SelectedContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (myProfile?.role?.permissionLevel !== PermissionLevel.SUPER)
      navigate(`${RouteConstants.opening}`);
  }, []);

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
