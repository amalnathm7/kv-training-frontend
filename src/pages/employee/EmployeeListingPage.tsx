import { AuthorizationContext } from '../../app';
import EmployeeListing from '../../components/listing/EmployeeListing';
import { RouteConstants } from '../../constants/routeConstants';
import HomeLayout from '../../layouts/home-layout/HomeLayout';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeeListingPage: React.FC = () => {
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
    'Employee Code',
    'Name',
    'Email',
    'Phone',
    'Joining Date',
    'Role',
    'Department',
    'Status',
    'Experience',
    'Address'
  ];

  useEffect(() => {
    setLabels(labelArray);
  }, []);

  const onCreateClicked = () => {
    navigate(`${RouteConstants.employee}/create`);
  };

  return (
    <HomeLayout
      subHeaderPrimaryAction={isSuperAuthorized ? onCreateClicked : null}
      subHeaderLabel='Employee List'
      subHeaderPrimaryActionLabel={isSuperAuthorized ? 'Create Employee' : ''}
      subHeaderPrimaryActionIcon={isSuperAuthorized ? 'create.png' : ''}
    >
      <EmployeeListing labels={labels} />
    </HomeLayout>
  );
};

export default EmployeeListingPage;
