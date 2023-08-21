import { RouteConstants } from '../../constants/routeConstants';
import HomeLayout from '../../layouts/home-layout/HomeLayout';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetMyProfileQuery } from '../../services/employeeApi';
import { PermissionLevel } from '../../utils/PermissionLevel';
import OpeningListing from '../../components/listing/OpeningListing';

const OpeningListingPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: myProfile, isSuccess } = useGetMyProfileQuery();
  const [isSuperAuthorized, setIsSuperAuthorized] = useState(false);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    if (
      isSuccess &&
      myProfile.data.role &&
      myProfile.data.role.permissionLevel === PermissionLevel.SUPER
    )
      setIsSuperAuthorized(true);
  }, [isSuccess]);

  useEffect(() => {
    if (isSuperAuthorized) {
      labelArray.push('Actions');
      setLabels(labelArray);
    }
  }, [isSuperAuthorized]);

  const labelArray = [
    'Opening ID',
    'Title',
    'Description',
    'Skills',
    'Location',
    'Experience',
    'Number of Openings',
    'Posted At',
    'Department',
    'Role'
  ];

  useEffect(() => {
    setLabels(labelArray);
  }, []);

  const onCreateClicked = () => {
    navigate(`${RouteConstants.opening}/create`);
  };

  return (
    <HomeLayout
      subHeaderLabel='Job Openings List'
      subHeaderPrimaryAction={isSuperAuthorized ? onCreateClicked : null}
      subHeaderPrimaryActionLabel={isSuperAuthorized ? 'Create Job Opening' : ''}
      subHeaderPrimaryActionIcon={isSuperAuthorized ? 'create.png' : ''}
    >
      <OpeningListing labels={labels} />
    </HomeLayout>
  );
};

export default OpeningListingPage;
