import HomeLayout from '../../layouts/home-layout/HomeLayout';
import React, { useContext, useEffect, useState } from 'react';
import ReferralListing from '../../components/listing/ReferralListing';
import { useGetRoleListQuery } from '../../services/roleApi';
import { AuthorizationContext, SelectedContext } from '../../app';
import { useParams } from 'react-router-dom';
import { candidateStatuses } from '../../constants/statusConstants';

const AllReferralsListingPage: React.FC = () => {
  const { isSuperAuthorized } = useContext(AuthorizationContext);
  const [labels, setLabels] = useState([]);
  const [emailValue, setEmailValue] = useState('');
  const [roleValue, setRoleValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const [roles, setRoles] = useState([]);
  const { id } = useParams();
  const { data: rolesData, isSuccess: isRoleFetchSuccess } = useGetRoleListQuery();

  useEffect(() => {
    if (isRoleFetchSuccess) {
      let rolesArray = ['All'];

      const additionalRoles = rolesData.data.map((role) => role.role);

      setRoles(rolesArray.concat(...additionalRoles));
    }
  }, [isRoleFetchSuccess]);

  const labelArray = [
    'Referral Code',
    'Name',
    'Email',
    'Phone',
    'Experience',
    'Status',
    'Opening',
    'Role',
    'Resume',
    'Referred By',
    'Bonus Status'
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

  const onChangeSearch = (event) => {
    setEmailValue(event.target.value);
  };

  const onChangeRole = (event) => {
    setRoleValue(event.target.value);
  };

  const onChangeStatus = (event) => {
    setStatusValue(event.target.value);
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
      subHeaderPrimaryActionLabel={'Search'}
      subHeaderPrimaryActionIcon={'search.png'}
      subHeaderPrimaryFilterAction={onChangeRole}
      subHeaderPrimaryFilterOptions={roles}
      subHeaderPrimaryFilterPlaceholder='Filter by role'
      subHeaderSecondaryFilterOptions={['All', ...candidateStatuses]}
      subHeaderSecondaryFilterPlaceholder='Filter by status'
      subHeaderSecondaryFilterAction={onChangeStatus}
    >
      <ReferralListing
        openingId={id}
        emailValue={emailValue}
        roleValue={roleValue}
        statusValue={statusValue}
        labels={labels}
        searchLabel='Search'
        selection='all'
      />
    </HomeLayout>
  );
};

export default AllReferralsListingPage;
