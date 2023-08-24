import React from 'react';
import { useEffect, useState } from 'react';
import { useGetMyProfileQuery } from '../../services/employeeApi';
import { PermissionLevel } from '../../utils/PermissionLevel';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetOpeningByIdQuery } from '../../services/openingApi';
import HomeLayout from '../../layouts/home-layout/HomeLayout';
import Card from '../../components/card/Card';
import { RouteConstants } from '../../constants/routeConstants';
import { OpeningType } from '../../types/OpeningType';

const OpeningDetailsPage: React.FC = () => {
  const { data: myProfile, isSuccess: isMyProfileFetchSuccess } = useGetMyProfileQuery();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isSuperAuthorized, setIsSuperAuthorized] = useState(false);

  useEffect(() => {
    if (isMyProfileFetchSuccess && myProfile.data.role?.permissionLevel === PermissionLevel.SUPER)
      setIsSuperAuthorized(true);

    if (
      isMyProfileFetchSuccess &&
      myProfile.data.role &&
      myProfile.data.role.permissionLevel !== PermissionLevel.BASIC
    )
      setIsAuthorized(true);
  }, [isMyProfileFetchSuccess]);

  const { id } = useParams();
  const navigate = useNavigate();

  const { data: openingData, isSuccess } = useGetOpeningByIdQuery(id);

  let items = [];
  let opening: OpeningType;

  if (isSuccess) {
    opening = openingData.data;

    items = [
      {
        label: 'Title',
        value: opening.title
      },
      {
        label: 'Description',
        value: opening.description
      },
      {
        label: 'Skills',
        value: opening.skills
      },
      {
        label: 'Location',
        value: opening.location
      },
      {
        label: 'Experience',
        value: opening.experience + ' Years'
      },
      {
        label: 'Number of openings',
        value: opening.count
      },
      {
        label: 'Posted At',
        value: new Date(opening.createdAt).toISOString().split('T')[0]
      },
      {
        label: 'Department',
        value: opening.department ? opening.department.name : 'NIL'
      },
      {
        label: 'Role',
        value: opening.role ? opening.role.role : 'NIL'
      }
    ];
  }

  const onEditClicked = () => {
    navigate(`${RouteConstants.opening}/${id}/edit`);
  };

  const onReferClicked = () => {
    navigate(`${RouteConstants.opening}/${id}/refer`);
  };

  const onViewReferralsClicked = () => {
    navigate(`${RouteConstants.referral}/opening/${opening.id}`);
  };

  const onViewApplicationsClicked = () => {
    navigate(`${RouteConstants.application}/opening/${opening.id}`);
  };

  return (
    <HomeLayout
      subHeaderLabel='Opening Details'
      subHeaderPrimaryAction={isAuthorized ? onReferClicked : null}
      subHeaderPrimaryActionLabel={isAuthorized ? 'Refer a friend' : ''}
      subHeaderPrimaryActionIcon={isAuthorized ? 'friend.png' : ''}
      subHeaderSecondaryAction={isSuperAuthorized ? onEditClicked : null}
      subHeaderSecondaryActionLabel={isSuperAuthorized ? 'Edit' : ''}
      subHeaderSecondaryActionIcon={isSuperAuthorized ? 'edit.svg' : ''}
    >
      <Card
        items={items}
        secondaryButtonsProps={[
          {
            style: { marginTop: '40px', marginBottom: '20px' },
            type: 'button',
            label: 'View Applications',
            onClick: onViewApplicationsClicked
          },
          {
            style: { marginTop: '40px', marginBottom: '20px', marginLeft: '20px' },
            type: 'button',
            label: 'View Referrals',
            onClick: onViewReferralsClicked
          }
        ]}
      ></Card>
    </HomeLayout>
  );
};

export default OpeningDetailsPage;
