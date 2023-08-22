import HomeLayout from '../../layouts/home-layout/HomeLayout';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useGetMyProfileQuery } from '../../services/employeeApi';
import { RouteConstants } from '../../constants/routeConstants';
import { PermissionLevel } from '../../utils/PermissionLevel';
import ReferralForm from '../../components/form/ReferralForm';
import { useGetReferralByIdQuery } from '../../services/referralApi';
import { ReferralType } from '../../types/ReferralType';

const ReferralEditPage: React.FC = () => {
  const { data: myProfile, isSuccess: isMyProfileFetchSuccess } = useGetMyProfileQuery();
  const navigate = useNavigate();

  const { id } = useParams();
  const { data: referralData, isSuccess: isReferralByIdFetchSuccess } = useGetReferralByIdQuery(id);
  const [referral, setReferral] = useState<ReferralType>(null);

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
        opening={referral?.opening}
        referral={referral}
        isEdit={true}
      />
    </HomeLayout>
  );
};

export default ReferralEditPage;
