import EmployeeListing from '../../components/listing/EmployeeListing';
import { RouteConstants } from '../../constants/routeConstants';
import HomeLayout from '../../layouts/home-layout/HomeLayout';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetMyProfileQuery } from '../../services/employeeApi';
import { PermissionLevel } from '../../utils/PermissionLevel';
import { SelectedContext } from '../../app';

const EmployeeListingPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, isSuccess: isMyProfileFetchSuccess } = useGetMyProfileQuery();
  const { setMyProfile, myProfile } = useContext(SelectedContext);
  const [isSuperAuthorized, setIsSuperAuthorized] = useState(false);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    setMyProfile(data?.data);
    if (myProfile?.role?.permissionLevel === PermissionLevel.SUPER) setIsSuperAuthorized(true);
  }, [isMyProfileFetchSuccess]);

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
