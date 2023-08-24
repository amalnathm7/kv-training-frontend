import { RouteConstants } from '../../constants/routeConstants';
import HomeLayout from '../../layouts/home-layout/HomeLayout';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OpeningListing from '../../components/listing/OpeningListing';
import { AuthorizationContext } from '../../app';

const OpeningListingPage: React.FC = () => {
  const navigate = useNavigate();
  const { isSuperAuthorized } = useContext(AuthorizationContext);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    if (isSuperAuthorized) {
      labelArray.push('Actions');
      setLabels(labelArray);
    }
  }, [isSuperAuthorized]);

  const labelArray = [
    'Title',
    'Description',
    'Skills',
    'Location',
    'Experience',
    'No. of Openings',
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
