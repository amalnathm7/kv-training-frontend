import React, { useContext, useEffect, useState } from 'react';
import HomeLayout from '../../layouts/home-layout/HomeLayout';
import ReferralListing from '../../components/listing/ReferralListing';
import { useNavigate } from 'react-router-dom';
import { useGetMyProfileQuery } from '../../services/employeeApi';
import { PermissionLevel } from '../../utils/PermissionLevel';
import { RouteConstants } from '../../constants/routeConstants';
import { SelectedContext } from '../../app';

const MyReferralsListingPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: myProfile, isSuccess: isMyProfileFetchSuccess } = useGetMyProfileQuery();
  const [isSuperAuthorized, setIsSuperAuthorized] = useState(false);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    if (isMyProfileFetchSuccess && myProfile.data.role?.permissionLevel === PermissionLevel.SUPER)
      setIsSuperAuthorized(true);
  }, [isMyProfileFetchSuccess]);

  const labelArray = [
    'Referral ID',
    'Candidate Name',
    'Email',
    'Experience',
    'Status',
    'Opening',
    'Role',
    'Actions'
  ];

  useEffect(() => {
    setLabels(labelArray);
  }, []);

  const onCreateClicked = () => {
    navigate(`${RouteConstants.referral}/:id/refer`);
  };

  const { setIsMyReferralsSelected } = useContext(SelectedContext);

  const onRouteChanged = (event) => {
    setIsMyReferralsSelected(event.target.selectedIndex === 0);
  };

  const routes = ['My Referrals', 'All Referrals'];

  return (
    <HomeLayout
      subHeaderRouteOptions={routes}
      subHeaderOnRouteChanged={onRouteChanged}
      subHeaderPrimaryAction={isSuperAuthorized ? onCreateClicked : null}
      subHeaderLabel=''
      subHeaderPrimaryActionIcon={''}
      subHeaderPrimaryActionLabel={''}
    >
      <ReferralListing labels={labels} selection='my' searchLabel='' />
    </HomeLayout>
  );
};

export default MyReferralsListingPage;
