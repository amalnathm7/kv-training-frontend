import HomeLayout from '../../layouts/home-layout/HomeLayout';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useGetMyProfileQuery } from '../../services/employeeApi';
import { RouteConstants } from '../../constants/routeConstants';
import { PermissionLevel } from '../../utils/PermissionLevel';
import { useGetOpeningByIdQuery } from '../../services/openingApi';
import ReferralForm from '../../components/form/ReferralForm';
import { useGetReferralByIdQuery } from '../../services/referralApi';

const ReferralEditPage: React.FC = () => {
  const { data: myProfile, isSuccess: isMyProfileFetchSuccess } = useGetMyProfileQuery();
  const navigate = useNavigate();

  const { id } = useParams();
  const { data: openingData, isSuccess: isOpeningFetchSucces } = useGetOpeningByIdQuery(id);
  const [opening, setOpening] = useState(null);

  const { data: referralData, isSuccess: isReferralByIdFetchSuccess } = useGetReferralByIdQuery(id);
  const [referral, setReferral] = useState(null);

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

  useEffect(() => {
    if (isReferralByIdFetchSuccess) setReferral(referralData.data);
  }, [isReferralByIdFetchSuccess]);

  return (
    <HomeLayout
      subHeaderPrimaryAction={null}
      subHeaderLabel='Edit Referral'
      subHeaderPrimaryActionLabel=''
      subHeaderPrimaryActionIcon=''
    >
      <ReferralForm
        referredBy={myProfile?.data}
        opening={opening}
        referral={referral?.data}
        isEdit={true}
      />
    </HomeLayout>
  );
};

export default ReferralEditPage;
