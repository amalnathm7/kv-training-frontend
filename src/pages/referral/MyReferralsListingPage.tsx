import React, { useContext, useEffect, useState } from 'react';
import HomeLayout from '../../layouts/home-layout/HomeLayout';
import ReferralListing from '../../components/listing/ReferralListing';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetMyProfileQuery } from '../../services/employeeApi';
import { PermissionLevel } from '../../utils/PermissionLevel';
import { RouteConstants } from '../../constants/routeConstants';
import { SelectedContext } from '../../app';

const MyReferralsListingPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: myProfile, isSuccess: isMyProfileFetchSuccess } = useGetMyProfileQuery();
  const [isSuperAuthorized, setIsSuperAuthorized] = useState(false);
  const [labels, setLabels] = useState([]);
  const location = useLocation();
  const [isRoutedFromOpening, setIsRoutedFromOpening] = useState(false);
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    if (location.pathname.includes('opening')) setIsRoutedFromOpening(true);
  }, []);

  useEffect(() => {
    setRoutes(isRoutedFromOpening ? null : ['My Referrals', 'All Referrals']);
  }, [isRoutedFromOpening]);

  useEffect(() => {
    if (isMyProfileFetchSuccess && myProfile.data.role?.permissionLevel === PermissionLevel.SUPER)
      setIsSuperAuthorized(true);
  }, [isMyProfileFetchSuccess]);

  useEffect(() => {
    if (isSuperAuthorized) {
      labelArray.unshift('Referral ID');
      setLabels(labelArray);
    }
  }, [isSuperAuthorized]);

  const labelArray = [
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

  return (
    <HomeLayout
      subHeaderRouteOptions={routes}
      subHeaderOnRouteChanged={onRouteChanged}
      subHeaderPrimaryAction={isSuperAuthorized ? onCreateClicked : null}
      subHeaderLabel={isRoutedFromOpening ? 'Referrals' : ''}
      subHeaderPrimaryActionIcon={''}
      subHeaderPrimaryActionLabel={''}
    >
      <ReferralListing labels={labels} selection='my' searchLabel='' />
    </HomeLayout>
  );
};

export default MyReferralsListingPage;
