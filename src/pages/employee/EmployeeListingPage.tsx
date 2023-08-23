import EmployeeListing from '../../components/listing/EmployeeListing';
import { RouteConstants } from '../../constants/routeConstants';
import HomeLayout from '../../layouts/home-layout/HomeLayout';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetMyProfileQuery } from '../../services/employeeApi';
import { PermissionLevel } from '../../utils/PermissionLevel';

const EmployeeListingPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: myProfile, isSuccess: isMyProfileFetchSuccess } = useGetMyProfileQuery();
  const [isSuperAuthorized, setIsSuperAuthorized] = useState(false);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    if (isMyProfileFetchSuccess && myProfile.data.role?.permissionLevel === PermissionLevel.SUPER)
      setIsSuperAuthorized(true);
  }, [isMyProfileFetchSuccess]);

  useEffect(() => {
    if (isSuperAuthorized) {
      labelArray.push('Actions');
      labelArray.unshift('Employee ID');
      setLabels(labelArray);
    }
  }, [isSuperAuthorized]);

  const labelArray = [
    'Employee Name',
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
