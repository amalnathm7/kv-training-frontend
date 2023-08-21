import React, { useEffect, useState } from 'react';
import { useGetMyProfileQuery } from '../../services/employeeApi';
import { useNavigate, useParams } from 'react-router-dom';
import { PermissionLevel } from '../../utils/PermissionLevel';
import { RouteConstants } from '../../constants/routeConstants';
import HomeLayout from '../../layouts/home-layout/HomeLayout';
import ReferralForm from '../../components/form/ReferralForm';
import { useGetOpeningByIdQuery } from '../../services/openingApi';

const ReferralCreatePage: React.FC = () => {
  const { data: myProfile, isSuccess: isMyProfileFetchSuccess } = useGetMyProfileQuery();
  const navigate = useNavigate();

  const { id } = useParams();
  const { data: openingData, isSuccess: isOpeningFetchSucces } = useGetOpeningByIdQuery(id);
  const [opening, setOpening] = useState(null);

  useEffect(() => {
    if (isOpeningFetchSucces) setOpening(openingData.data);
  }, [isOpeningFetchSucces]);

  useEffect(() => {
    if (
      isMyProfileFetchSuccess &&
      (!myProfile.data.role || myProfile.data.role.permissionLevel === PermissionLevel.BASIC)
    )
      navigate(`${RouteConstants.employee}`);
  }, [isMyProfileFetchSuccess]);

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
