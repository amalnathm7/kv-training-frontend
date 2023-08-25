import React, { useContext, useEffect, useState } from 'react';
import HomeLayout from '../../layouts/home-layout/HomeLayout';
import ReferralListing from '../../components/listing/ReferralListing';
import { useLocation, useParams } from 'react-router-dom';
import { AuthorizationContext, SelectedContext } from '../../app';

const MyReferralsListingPage: React.FC = () => {
  const { isBasicAuthorized } = useContext(AuthorizationContext);

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
    if (!isBasicAuthorized) setLabels(labelArray);
  }, [isBasicAuthorized]);

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
    'Bonus Status',
    'Actions'
  ];

  const { setIsMyReferralsSelected } = useContext(SelectedContext);

  const onRouteChanged = (event) => {
    setIsMyReferralsSelected(event.target.selectedIndex === 0);
  };

  return (
    <HomeLayout
      subHeaderRouteOptions={routes}
      subHeaderOnRouteChanged={onRouteChanged}
      subHeaderPrimaryAction={null}
      subHeaderLabel={isRoutedFromOpening ? 'Referrals' : ''}
      subHeaderPrimaryActionIcon={''}
      subHeaderPrimaryActionLabel={''}
    >
      <ReferralListing openingId={id} labels={labels} selection='my' searchLabel='' />
    </HomeLayout>
  );
};

export default MyReferralsListingPage;
