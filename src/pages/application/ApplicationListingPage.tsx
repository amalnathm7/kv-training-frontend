import HomeLayout from '../../layouts/home-layout/HomeLayout';
import React, { useContext, useEffect, useState } from 'react';
import { useGetRoleListQuery } from '../../services/roleApi';
import ApplicationListing from '../../components/listing/ApplicationListing';
import { useParams } from 'react-router-dom';
import { AuthorizationContext, SelectedContext } from '../../app';
import { candidateStatuses } from '../../constants/statusConstants';

const ApplicationListingPage: React.FC = () => {
  const { isBasicAuthorized } = useContext(AuthorizationContext);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [labels, setLabels] = useState([]);
  const [emailValue, setEmailValue] = useState('');
  const [roleValue, setRoleValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
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
    if (!isBasicAuthorized) setIsAuthorized(true);
  }, [isBasicAuthorized]);

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

  const onChangeStatus = (event) => {
    setStatusValue(event.target.value);
  };

  return (
    <HomeLayout
      subHeaderPrimaryAction={onChangeSearch}
      subHeaderLabel={isRoutedFromOpening ? 'Applications' : 'Applications List'}
      subHeaderPrimaryActionValue={emailValue}
      subHeaderPrimaryActionPlaceholder={'Search by email'}
      subHeaderPrimaryActionLabel={isAuthorized ? 'Search' : ''}
      subHeaderPrimaryActionIcon={isAuthorized ? 'search.png' : ''}
      subHeaderPrimaryFilterAction={onChangeRole}
      subHeaderPrimaryFilterOptions={roles}
      subHeaderPrimaryFilterPlaceholder='Filter by role'
      subHeaderSecondaryFilterOptions={['All', ...candidateStatuses]}
      subHeaderSecondaryFilterPlaceholder='Filter by status'
      subHeaderSecondaryFilterAction={onChangeStatus}
    >
      <ApplicationListing
        emailValue={emailValue}
        roleValue={roleValue}
        statusValue={statusValue}
        labels={labels}
        searchLabel='Search'
        openingId={id}
      />
    </HomeLayout>
  );
};

export default ApplicationListingPage;
