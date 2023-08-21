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
    if (
      isSuccess &&
      myProfile.data.role &&
      myProfile.data.role.permissionLevel === PermissionLevel.SUPER
    )
      setIsSuperAuthorized(true);
  }, [isSuccess]);
  const labelArray = [
    'Referral ID',
    'Candidate Name',
    'Email',
    'Experience',
    'Status',
    'Opening',
    'Referred By',
    'Role '
  ];

  useEffect(() => {
    if (isSuperAuthorized) labelArray.push('Actions');
  }, [isSuperAuthorized]);

  useEffect(() => {
    setLabels(labelArray);
  }, []);

  const onSearchClicked = () => {
    console.log('clicked');
    setSearchClicked(true);
    console.log(searchClicked);
  };

  return (
    <HomeLayout
      subHeaderPrimaryAction={isSuperAuthorized ? onSearchClicked : null}
      subHeaderLabel='Referral List'
      subHeaderPrimaryActionLabel={isSuperAuthorized ? 'Search' : ''}
      subHeaderPrimaryActionIcon={isSuperAuthorized ? 'searchicon.jpg' : ''}
      searchClicked={searchClicked}
    >
      <ReferralListing labels={labels} searchLabel='Search' selection='all' />
      {/* {searchClicked && <input type='text' placeholder='Search' />} */}
    </HomeLayout>
  );
};

export default ReferralListingPage;
