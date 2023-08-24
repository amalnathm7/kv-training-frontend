import HomeLayout from '../../layouts/home-layout/HomeLayout';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from '../../constants/routeConstants';
import OpeningForm from '../../components/form/OpeningForm';
import { AuthorizationContext } from '../../app';
const OpeningCreatePage: React.FC = () => {
  const { isSuperAuthorized } = useContext(AuthorizationContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSuperAuthorized) navigate(`${RouteConstants.opening}`);
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
