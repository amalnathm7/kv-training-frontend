import HomeLayout from '../../layouts/home-layout/HomeLayout';
import React, { useContext, useEffect, useState } from 'react';
import { PermissionLevel } from '../../utils/PermissionLevel';
import { useGetRoleListQuery } from '../../services/roleApi';
import ApplicationListing from '../../components/listing/ApplicationListing';
import { useParams } from 'react-router-dom';
import { SelectedContext } from '../../app';

const ApplicationListingPage: React.FC = () => {
  const { myProfile } = useContext(SelectedContext);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [labels, setLabels] = useState([]);
  const [emailValue, setEmailValue] = useState('');
  const [roleValue, setRoleValue] = useState('');
  const [roles, setRoles] = useState([]);

  const { data: rolesData, isSuccess: isRoleFetchSuccess } = useGetRoleListQuery();

  const { selectedTabIndex } = useContext(SelectedContext);

  useEffect(() => {
    if (location.pathname.includes('opening')) setIsRoutedFromOpening(true);
    else setIsRoutedFromOpening(false);
  }, [selectedTabIndex]);

  const [isRoutedFromOpening, setIsRoutedFromOpening] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (isRoleFetchSuccess) {
      let rolesArray = ['All'];

      const additionalRoles = rolesData.data.map((role) => role.role);

      setRoles(rolesArray.concat(...additionalRoles));
    }
  }, [isRoleFetchSuccess]);

  useEffect(() => {
    if (myProfile?.role && myProfile?.role.permissionLevel !== PermissionLevel.BASIC)
      setIsAuthorized(true);
  }, [myProfile]);

  const labelArray = [
    'Application Code',
    'Name',
    'Email',
    'Phone',
    'Experience',
    'Status',
    'Opening',
    'Role',
    'Resume'
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
      subHeaderLabel={isRoutedFromOpening ? 'Applications' : 'Applications List'}
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
        openingId={id}
      />
    </HomeLayout>
  );
};

export default ApplicationListingPage;
