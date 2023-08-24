import Card, { CardItemType } from '../../components/card/Card';
import HomeLayout from '../../layouts/home-layout/HomeLayout';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PermissionLevel } from '../../utils/PermissionLevel';
import { useGetReferralByIdQuery } from '../../services/referralApi';
import { SelectedContext } from '../../app';

const ReferralDetailsPage: React.FC = () => {
  const { myProfile } = useContext(SelectedContext);
  const [isSuperAuthorized, setIsSuperAuthorized] = useState(false);

  useEffect(() => {
    if (myProfile?.role?.permissionLevel === PermissionLevel.SUPER) setIsSuperAuthorized(true);
  }, [myProfile]);

  const { id } = useParams();
  const navigate = useNavigate();

  const { data: referralData, isSuccess } = useGetReferralByIdQuery(id);

  let items: CardItemType[] = [];

  if (isSuccess) {
    const referral = referralData.data;

    items = [
      {
        label: 'Referral Code',
        value: referral.candidateCode
      },
      {
        label: 'Name',
        value: referral.name
      },
      {
        label: 'Email',
        value: referral.email
      },

      {
        label: 'Experience',
        value: referral.experience + ' Years'
      },
      {
        label: 'Phone',
        value: referral.phone
      },

      {
        label: 'Role',
        value: referral.role ? referral.role.role : 'NIL'
      },
      {
        label: 'Status',
        value: referral.status,
        isStatus: true
      },
      {
        label: 'Referred By ',
        value: referral.referredBy ? referral.referredBy.name : 'NIL'
      },
      {
        label: 'Opening Title',
        value: referral.opening ? referral.opening.title : 'NIL'
      },
      {
        label: 'Address',
        value:
          referral.address.line1 +
          ', ' +
          referral.address.line2 +
          ', ' +
          referral.address.city +
          ', ' +
          referral.address.state +
          ', ' +
          referral.address.country +
          ', ' +
          referral.address.pincode
      },
      {
        label: 'Resume',
        value: 'View Resume',
        filePath: referral.resume
      }
    ];
  }

  const onEditClicked = () => {
    navigate(window.location.pathname + '/edit');
  };

  return (
    <HomeLayout
      subHeaderPrimaryAction={
        isSuperAuthorized || myProfile?.id === referralData?.data.referredBy?.id
          ? onEditClicked
          : null
      }
      subHeaderLabel='Referral Details'
      subHeaderPrimaryActionLabel={
        isSuperAuthorized || myProfile?.id === referralData?.data.referredBy?.id ? 'Edit' : ''
      }
      subHeaderPrimaryActionIcon={
        isSuperAuthorized || myProfile?.id === referralData?.data.referredBy?.id ? 'edit.svg' : ''
      }
    >
      <Card items={items}></Card>
    </HomeLayout>
  );
};

export default ReferralDetailsPage;
