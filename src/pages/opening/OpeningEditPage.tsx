import { useNavigate, useParams } from 'react-router-dom';
import HomeLayout from '../../layouts/home-layout/HomeLayout';
import React, { useContext, useEffect, useState } from 'react';
import { RouteConstants } from '../../constants/routeConstants';
import OpeningForm from '../../components/form/OpeningForm';
import { useGetOpeningByIdQuery } from '../../services/openingApi';
import { AuthorizationContext } from '../../app';

const OpeningEditPage: React.FC = () => {
  const navigate = useNavigate();
  const { isSuperAuthorized } = useContext(AuthorizationContext);

  useEffect(() => {
    if (!isSuperAuthorized) navigate(`${RouteConstants.opening}`, { replace: true });
  }, []);

  const { id } = useParams();

  const { data: openingData, isSuccess: isOpeningFetchSuccess } = useGetOpeningByIdQuery(id);

  const [opening, setOpening] = useState(null);

  useEffect(() => {
    if (isOpeningFetchSuccess) setOpening(openingData.data);
  }, [isOpeningFetchSuccess]);

  return (
    <HomeLayout
      subHeaderPrimaryAction={null}
      subHeaderLabel='Edit Opening'
      subHeaderPrimaryActionLabel=''
      subHeaderPrimaryActionIcon=''
    >
      <OpeningForm opening={opening} isEdit={true} />
    </HomeLayout>
  );
};

export default OpeningEditPage;
