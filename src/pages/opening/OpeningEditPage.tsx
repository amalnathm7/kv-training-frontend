import { useNavigate, useParams } from 'react-router-dom';
import HomeLayout from '../../layouts/home-layout/HomeLayout';
import React, { useContext, useEffect, useState } from 'react';
import { PermissionLevel } from '../../utils/PermissionLevel';
import { RouteConstants } from '../../constants/routeConstants';
import OpeningForm from '../../components/form/OpeningForm';
import { useGetOpeningByIdQuery } from '../../services/openingApi';
import { SelectedContext } from '../../app';

const OpeningEditPage: React.FC = () => {
  const { myProfile } = useContext(SelectedContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (myProfile?.role?.permissionLevel !== PermissionLevel.SUPER)
      navigate(`${RouteConstants.opening}`, { replace: true });
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
