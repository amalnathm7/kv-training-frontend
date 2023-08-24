import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RouteConstants } from '../../constants/routeConstants';
import HomeLayout from '../../layouts/home-layout/HomeLayout';
import ReferralForm from '../../components/form/ReferralForm';
import { useGetOpeningByIdQuery } from '../../services/openingApi';
import { PermissionLevel } from '../../utils/PermissionLevel';
import { SelectedContext } from '../../app';

const ReferralCreatePage: React.FC = () => {
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
      <ReferralForm referredBy={myProfile} opening={opening} referral={null} isEdit={false} />
    </HomeLayout>
  );
};

export default ReferralCreatePage;
