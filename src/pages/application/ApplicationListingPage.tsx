import HomeLayout from '../../layouts/home-layout/HomeLayout';
import React, { useEffect, useState } from 'react';
import { useGetMyProfileQuery } from '../../services/employeeApi';
import { PermissionLevel } from '../../utils/PermissionLevel';
import { useGetRoleListQuery } from '../../services/roleApi';
import ApplicationListing from '../../components/listing/ApplicationListing';

const ApplicationListingPage: React.FC = () => {
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
    'Application ID',
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

  return (
    <HomeLayout
      subHeaderPrimaryAction={onChangeSearch}
      subHeaderLabel='Application List'
      subHeaderPrimaryActionValue={emailValue}
      subHeaderPrimaryActionPlaceholder={'Search by email'}
      subHeaderPrimaryActionFilterOptions={roles}
      subHeaderSecondaryAction={onChangeRole}
      subHeaderSecondaryActionPlaceholder='Filter by role'
      subHeaderPrimaryActionLabel={isAuthorized ? 'Search' : ''}
      subHeaderPrimaryActionIcon={isAuthorized ? 'search.png' : ''}
    >
      <ApplicationListing
        emailValue={emailValue}
        roleValue={roleValue}
        labels={labels}
        searchLabel='Search'
        selection='all'
      />
    </HomeLayout>
  );
};

export default ApplicationListingPage;
