import AllReferralsListing from '../../components/listing/AllReferralsListing';
import HomeLayout from '../../layouts/home-layout/HomeLayout';
import React, { useEffect, useState } from 'react';
import { useGetMyProfileQuery } from '../../services/employeeApi';
const ReferralListingPage: React.FC = () => {
  const { data: myProfile, isSuccess } = useGetMyProfileQuery();
  const [isBasicAuthorized, setIsBasicAuthorized] = useState(false);
  const [labels, setLabels] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);

  useEffect(() => {
    if (
      isSuccess &&
      myProfile.data.role //&&
      //myProfile.data.role.permissionLevel === PermissionLevel.BASIC
    )
      setIsBasicAuthorized(true);
  }, [isSuccess]);

  const labelArray = [
    'Referral ID',
    'Candidate Name',
    'Email',
    'Experience',
    'Status',
    'Opening Id',
    'Referred By',
    'Role Id'
  ];

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
      subHeaderPrimaryAction={isBasicAuthorized ? onSearchClicked : null}
      subHeaderLabel='Referral List'
      subHeaderPrimaryActionLabel={isBasicAuthorized ? 'Search' : ''}
      subHeaderPrimaryActionIcon={isBasicAuthorized ? 'searchicon.jpg' : ''}
      searchClicked={searchClicked}
    >
      <AllReferralsListing labels={labels} searchLabel='Search' />
      {/* {searchClicked && <input type='text' placeholder='Search' />} */}
    </HomeLayout>
  );
};

export default ReferralListingPage;
