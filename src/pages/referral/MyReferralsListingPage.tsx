import React, { useContext, useEffect, useState } from 'react';
import HomeLayout from '../../layouts/home-layout/HomeLayout';
import ReferralListing from '../../components/listing/ReferralListing';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { PermissionLevel } from '../../utils/PermissionLevel';
import { RouteConstants } from '../../constants/routeConstants';
import { SelectedContext } from '../../app';

const MyReferralsListingPage: React.FC = () => {
  const navigate = useNavigate();
  const { myProfile } = useContext(SelectedContext);
  const [isSuperAuthorized, setIsSuperAuthorized] = useState(false);
  const [labels, setLabels] = useState([]);
  const location = useLocation();
  const [isRoutedFromOpening, setIsRoutedFromOpening] = useState(false);
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    if (location.pathname.includes('opening')) setIsRoutedFromOpening(true);
  }, []);

  const { id } = useParams();

  useEffect(() => {
    setRoutes(isRoutedFromOpening ? null : ['My Referrals', 'All Referrals']);
  }, [isRoutedFromOpening]);

  useEffect(() => {
    if (myProfile?.role?.permissionLevel === PermissionLevel.SUPER) setIsSuperAuthorized(true);
  }, [myProfile]);

  useEffect(() => {
    if (isSuperAuthorized) setLabels(labelArray);
  }, [isSuperAuthorized]);

  const labelArray = [
    'Referral Code',
    'Candidate Name',
    'Email',
    'Phone',
    'Experience',
    'Status',
    'Opening',
    'Role',
    'Resume',
    'Actions'
  ];

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
      <ReferralListing openingId={id} labels={labels} selection='my' searchLabel='' />
    </HomeLayout>
  );
};

export default MyReferralsListingPage;
