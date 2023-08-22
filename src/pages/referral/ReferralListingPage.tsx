import HomeLayout from '../../layouts/home-layout/HomeLayout';
import React, { useEffect, useState } from 'react';
import { useGetMyProfileQuery } from '../../services/employeeApi';
import { PermissionLevel } from '../../utils/PermissionLevel';
import ReferralListing from '../../components/listing/ReferralListing';
import { useGetRoleListQuery } from '../../services/roleApi';

const ReferralListingPage: React.FC = () => {
  const { data: myProfile, isSuccess: isMyProfileFetchSuccess } = useGetMyProfileQuery();
  const [isSuperAuthorized, setIsSuperAuthorized] = useState(false);
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
      isMyProfileFetchSuccess &&
      myProfile.data.role &&
      myProfile.data.role.permissionLevel === PermissionLevel.SUPER
    )
      setIsSuperAuthorized(true);
  }, [isMyProfileFetchSuccess]);

  const labelArray = [
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
      labelArray.unshift('Referral ID');
      setLabels(labelArray);
    }
  }, [isSuperAuthorized]);

  useEffect(() => {
    setLabels(labelArray);
  }, []);

  const onChangeSearch = (event) => {
    setEmailValue(event.target.value);
  };

  const onChangeRole = (event) => {
    setRoleValue(event.target.value);
  };

  return (
    <HomeLayout
      subHeaderPrimaryAction={onChangeSearch}
      subHeaderLabel='Referral List'
      subHeaderPrimaryActionValue={emailValue}
      subHeaderPrimaryActionPlaceholder={'Search by email'}
      subHeaderPrimaryActionFilterOptions={roles}
      subHeaderSecondaryAction={onChangeRole}
      subHeaderSecondaryActionPlaceholder='Filter by role'
      subHeaderPrimaryActionLabel={'Search'}
      subHeaderPrimaryActionIcon={'search.png'}
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

export default ReferralListingPage;
