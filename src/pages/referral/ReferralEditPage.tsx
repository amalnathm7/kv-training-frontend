import HomeLayout from '../../layouts/home-layout/HomeLayout';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { PermissionLevel } from '../../utils/PermissionLevel';
import ReferralForm from '../../components/form/ReferralForm';
import { useGetReferralByIdQuery } from '../../services/referralApi';
import { ReferralType } from '../../types/ReferralType';
import { SelectedContext } from '../../app';

const ReferralEditPage: React.FC = () => {
  const { myProfile } = useContext(SelectedContext);
  const navigate = useNavigate();

  const { id } = useParams();
  const { data: referralData, isSuccess: isReferralByIdFetchSuccess } = useGetReferralByIdQuery(id);
  const [referral, setReferral] = useState<ReferralType>(null);

  useEffect(() => {
    if (isReferralByIdFetchSuccess) {
      const isNotAuthorized =
        !myProfile?.role ||
        (myProfile?.role.permissionLevel !== PermissionLevel.SUPER &&
          myProfile?.id !== referralData.data.referredBy?.id);

      if (isNotAuthorized) navigate(-1);
    }
  }, [isReferralByIdFetchSuccess, myProfile]);

  useEffect(() => {
    if (isReferralByIdFetchSuccess) setReferral(referralData.data);
    console.log(referral);
  }, [isReferralByIdFetchSuccess]);

  return (
    <HomeLayout
      subHeaderPrimaryAction={null}
      subHeaderLabel='Edit Referral'
      subHeaderPrimaryActionLabel=''
      subHeaderPrimaryActionIcon=''
    >
      <ReferralForm
        referredBy={myProfile}
        opening={referral?.opening}
        referral={referral}
        isEdit={true}
      />
    </HomeLayout>
  );
};

export default ReferralEditPage;
