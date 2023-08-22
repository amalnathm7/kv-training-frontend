import HomeLayout from '../../layouts/home-layout/HomeLayout';
import React, { useContext, useEffect, useState } from 'react';
import { useGetMyProfileQuery } from '../../services/employeeApi';
import { PermissionLevel } from '../../utils/PermissionLevel';
import ReferralListing from '../../components/listing/ReferralListing';
import { useGetRoleListQuery } from '../../services/roleApi';
import { SelectedContext } from '../../app';

const AllReferralsListingPage: React.FC = () => {
  const { data: myProfile, isSuccess } = useGetMyProfileQuery();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [labels, setLabels] = useState([]);
  const [emailValue, setEmailValue] = useState('');
  const [roleValue, setRoleValue] = useState('');
  const [roles, setRoles] = useState([]);

  const { data: rolesData, isSuccess: isRoleFetchSuccess } = useGetRoleListQuery();

  useEffect(() => {
    if (isRoleFetchSuccess) {
      let rolesArray = ['All'];

      const additionalRoles = rolesData.data.map((role) => role.role);

      setRoles(rolesArray.concat(...additionalRoles));
    }
  }, [isRoleFetchSuccess]);

  useEffect(() => {
    if (
      isSuccess &&
      myProfile.data.role &&
      myProfile.data.role.permissionLevel !== PermissionLevel.BASIC
    )
      setIsAuthorized(true);
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
    if (isAuthorized) {
      labelArray.push('Actions');
      setLabels(labelArray);
    }
  }, [isAuthorized]);

  useEffect(() => {
    setLabels(labelArray);
  }, []);

  const onChangeSearch = (event) => {
    setEmailValue(event.target.value);
  };

  const onChangeRole = (event) => {
    setRoleValue(event.target.value);
  };

  const { setIsMyReferralsSelected } = useContext(SelectedContext);

  const onRouteChanged = (event) => {
    setIsMyReferralsSelected(event.target.selectedIndex === 1);
  };

  const routes = ['All Referrals', 'My Referrals'];

  return (
    <HomeLayout
      subHeaderRouteOptions={routes}
      subHeaderOnRouteChanged={onRouteChanged}
      subHeaderPrimaryAction={onChangeSearch}
      subHeaderLabel=''
      subHeaderPrimaryActionValue={emailValue}
      subHeaderPrimaryActionPlaceholder={'Search by email'}
      subHeaderPrimaryActionFilterOptions={roles}
      subHeaderSecondaryAction={onChangeRole}
      subHeaderSecondaryActionPlaceholder='Filter by role'
      subHeaderPrimaryActionLabel={isAuthorized ? 'Search' : ''}
      subHeaderPrimaryActionIcon={isAuthorized ? 'search.png' : ''}
    >
      <ReferralListing
        emailValue={emailValue}
        roleValue={roleValue}
        labels={labels}
        searchLabel='Search'
        selection='all'
      />
    </HomeLayout>
  );
};

export default AllReferralsListingPage;
