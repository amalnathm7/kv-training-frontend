import HomeLayout from '../../layouts/home-layout/HomeLayout';
import React, { useEffect, useState } from 'react';
import { useGetMyProfileQuery } from '../../services/employeeApi';
import { PermissionLevel } from '../../utils/PermissionLevel';
import ReferralListing from '../../components/listing/ReferralListing';

const ReferralListingPage: React.FC = () => {
  const { data: myProfile, isSuccess } = useGetMyProfileQuery();
  const [isSuperAuthorized, setIsSuperAuthorized] = useState(false);
  const [labels, setLabels] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);

  useEffect(() => {
    if (isSuccess && myProfile.data.role?.permissionLevel === PermissionLevel.SUPER)
      setIsSuperAuthorized(true);
  }, [isSuccess]);

  const labelArray = [
    'Referral ID',
    'Candidate Name',
    'Email',
    'Experience',
    'Status',
    'Opening',
    'Role',
    'Referred By'
  ];

  useEffect(() => {
    if (isSuperAuthorized) {
      labelArray.push('Actions');
      setLabels(labelArray);
    }
  }, [isSuperAuthorized]);

  useEffect(() => {
    setLabels(labelArray);
  }, []);

  const onSearchClicked = () => {
    setSearchClicked(true);
  };

  return (
    <HomeLayout
      subHeaderPrimaryAction={isSuperAuthorized ? onSearchClicked : null}
      subHeaderLabel='Referral List'
      subHeaderPrimaryActionLabel={isSuperAuthorized ? 'Search' : ''}
      subHeaderPrimaryActionIcon={isSuperAuthorized ? 'search.png' : ''}
      searchClicked={searchClicked}
    >
      <ReferralListing labels={labels} searchLabel='Search' selection='all' />
      {/* {searchClicked && <input type='text' placeholder='Search' />} */}
    </HomeLayout>
  );
};

export default ReferralListingPage;
