import HomeLayout from '../../layouts/home-layout/HomeLayout';
import React, { useContext, useEffect, useState } from 'react';
import { useGetRoleListQuery } from '../../services/roleApi';
import ApplicationListing from '../../components/listing/ApplicationListing';
import { useParams } from 'react-router-dom';
import { AuthorizationContext, SelectedContext } from '../../app';
import { bonusStatuses, candidateStatuses } from '../../constants/statusConstants';
import { FilterType } from '../../components/sub-header/SubHeader';

const ApplicationListingPage: React.FC = () => {
  const { isBasicAuthorized } = useContext(AuthorizationContext);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [labels, setLabels] = useState([]);
  const [emailValue, setEmailValue] = useState('');
  const [roleValue, setRoleValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const [bonusStatusValue, setBonusStatusValue] = useState('');
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

  const onChangeBonusStatus = (event) => {
    setBonusStatusValue(event.target.value);
  };

  let filters: FilterType[] = [
    {
      options: ['All', ...bonusStatuses],
      action: onChangeBonusStatus,
      placeholder: 'Filter by bonus status'
    },
    {
      options: ['All', ...candidateStatuses],
      action: onChangeStatus,
      placeholder: 'Filter by status'
    },
    {
      options: roles,
      action: onChangeRole,
      placeholder: 'Filter by role'
    }
  ];

  return (
    <HomeLayout
      subHeaderPrimaryAction={onChangeSearch}
      subHeaderLabel={isRoutedFromOpening ? 'Applications' : 'Applications List'}
      subHeaderPrimaryActionValue={emailValue}
      subHeaderPrimaryActionPlaceholder={'Search by email'}
      subHeaderPrimaryActionLabel={isAuthorized ? 'Search' : ''}
      subHeaderPrimaryActionIcon={isAuthorized ? 'search.png' : ''}
      subHeaderFilters={filters}
    >
      <ApplicationListing
        emailValue={emailValue}
        roleValue={roleValue}
        statusValue={statusValue}
        bonusStatusValue={bonusStatusValue}
        labels={labels}
        searchLabel='Search'
        openingId={id}
      />
    </HomeLayout>
  );
};

export default ApplicationListingPage;
