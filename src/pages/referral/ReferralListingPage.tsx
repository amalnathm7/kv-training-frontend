import ReferralsListing from '../../components/listing/AllReferralsListing';
import HomeLayout from '../../layouts/home-layout/HomeLayout';
import React, { useEffect, useState } from 'react';
import { useGetMyProfileQuery } from '../../services/employeeApi';
//import { PermissionLevel } from '../../utils/PermissionLevel';
import './ReferralListingPage.css';
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
      subHeaderAction={isBasicAuthorized ? onSearchClicked : null}
      subHeaderLabel='Referral List'
      subHeaderActionLabel={isBasicAuthorized ? 'Search' : ''}
      subHeaderActionIcon={isBasicAuthorized ? 'searchicon.jpg' : ''}
    >
      <ReferralsListing labels={labels} searchLabel='Search' selection={'all'} />
      {/* {searchClicked && <input type='text' placeholder='Search' />} */}
    </HomeLayout>
  );
};

export default ReferralListingPage;
