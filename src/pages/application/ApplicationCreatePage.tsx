import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PermissionLevel } from '../../utils/PermissionLevel';
import { RouteConstants } from '../../constants/routeConstants';
import HomeLayout from '../../layouts/home-layout/HomeLayout';
import ApplicationForm from '../../components/form/ApplicationForm';
import { useGetOpeningByIdQuery } from '../../services/openingApi';
import { SelectedContext } from '../../app';

const ApplicationCreatePage: React.FC = () => {
  const { myProfile } = useContext(SelectedContext);
  const navigate = useNavigate();

  const { id } = useParams();
  const { data: openingData, isSuccess: isOpeningFetchSucces } = useGetOpeningByIdQuery(id);
  const [opening, setOpening] = useState(null);

  useEffect(() => {
    if (isOpeningFetchSucces) setOpening(openingData.data);
  }, [isOpeningFetchSucces]);

  useEffect(() => {
    if (!myProfile?.role || myProfile?.role.permissionLevel === PermissionLevel.BASIC)
      navigate(`${RouteConstants.employee}`);
  }, [myProfile]);

  return (
    <HomeLayout
      subHeaderPrimaryAction={() => {}}
      subHeaderLabel='Refer a friend'
      subHeaderPrimaryActionLabel=''
      subHeaderPrimaryActionIcon=''
    >
      <ApplicationForm opening={opening} application={null} isEdit={false} />
    </HomeLayout>
  );
};

export default ApplicationCreatePage;
