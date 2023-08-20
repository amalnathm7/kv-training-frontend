import { useNavigate, useParams } from 'react-router-dom';
import HomeLayout from '../../layouts/home-layout/HomeLayout';
import React, { useEffect, useState } from 'react';
import { useGetMyProfileQuery } from '../../services/employeeApi';
import { PermissionLevel } from '../../utils/PermissionLevel';
import { RouteConstants } from '../../constants/routeConstants';
import OpeningForm from '../../components/form/OpeningForm';
import { useGetOpeningByIdQuery } from '../../services/openingApi';

const OpeningEditPage: React.FC = () => {
  const { data: myProfile, isSuccess: isMyProfileFetchSuccess } = useGetMyProfileQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (isMyProfileFetchSuccess && myProfile.data.role?.permissionLevel !== PermissionLevel.SUPER)
      navigate(`${RouteConstants.opening}`, { replace: true });
  }, [isMyProfileFetchSuccess]);

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
