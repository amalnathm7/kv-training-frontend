import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RouteConstants } from '../../constants/routeConstants';
import HomeLayout from '../../layouts/home-layout/HomeLayout';
import ApplicationForm from '../../components/form/ApplicationForm';
import { useGetOpeningByIdQuery } from '../../services/openingApi';
import { AuthorizationContext } from '../../app';

const ApplicationCreatePage: React.FC = () => {
  const { isBasicAuthorized } = useContext(AuthorizationContext);
  const navigate = useNavigate();

  const { id } = useParams();
  const { data: openingData, isSuccess: isOpeningFetchSucces } = useGetOpeningByIdQuery(id);
  const [opening, setOpening] = useState(null);

  useEffect(() => {
    if (isOpeningFetchSucces) setOpening(openingData.data);
  }, [isOpeningFetchSucces]);

  if (!isBasicAuthorized) navigate(`${RouteConstants.employee}`);

  return (
    <HomeLayout
      subHeaderPrimaryAction={() => {}}
      subHeaderLabel='Apply'
      subHeaderPrimaryActionLabel=''
      subHeaderPrimaryActionIcon=''
    >
      <ApplicationForm opening={opening} application={null} isEdit={false} />
    </HomeLayout>
  );
};

export default ApplicationCreatePage;
