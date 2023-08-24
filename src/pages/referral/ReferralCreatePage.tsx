import React, { useEffect, useState } from 'react';
import { useGetMyProfileQuery } from '../../services/employeeApi';
import { useNavigate, useParams } from 'react-router-dom';
import { RouteConstants } from '../../constants/routeConstants';
import HomeLayout from '../../layouts/home-layout/HomeLayout';
import ReferralForm from '../../components/form/ReferralForm';
import { useGetOpeningByIdQuery } from '../../services/openingApi';
import { PermissionLevel } from '../../utils/PermissionLevel';

const ReferralCreatePage: React.FC = () => {
  const {
    data: myProfile,
    isSuccess: isMyProfileFetchSuccess,
    isError: isMyProfileFetchError
  } = useGetMyProfileQuery();
  const navigate = useNavigate();

  const { id } = useParams();
  const { data: openingData, isSuccess: isOpeningFetchSucces } = useGetOpeningByIdQuery(id);
  const [opening, setOpening] = useState(null);

  useEffect(() => {
    if (isOpeningFetchSucces) setOpening(openingData.data);
  }, [isOpeningFetchSucces]);

  useEffect(() => {
    if (
      isMyProfileFetchError ||
      (isMyProfileFetchSuccess &&
        (!myProfile.data.role || myProfile.data.role.permissionLevel === PermissionLevel.BASIC))
    )
      navigate(`${RouteConstants.opening}`);
  }, [isMyProfileFetchError]);

  return (
    <HomeLayout
      subHeaderPrimaryAction={() => {}}
      subHeaderLabel='Refer a friend'
      subHeaderPrimaryActionLabel=''
      subHeaderPrimaryActionIcon=''
    >
      <ReferralForm referredBy={myProfile?.data} opening={opening} referral={null} isEdit={false} />
    </HomeLayout>
  );
};

export default ReferralCreatePage;
