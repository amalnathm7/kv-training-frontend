import { useNavigate, useParams } from 'react-router-dom';
import EmployeeForm from '../../components/form/EmployeeForm';
import HomeLayout from '../../layouts/home-layout/HomeLayout';
import React, { useEffect, useState } from 'react';
import { useGetEmployeeByIdQuery, useGetMyProfileQuery } from '../../services/employeeApi';
import { PermissionLevel } from '../../utils/PermissionLevel';
import { RouteConstants } from '../../constants/routeConstants';

const EmployeeEditPage: React.FC = () => {
  const { data: myProfile, isSuccess: isMyProfileFetchSuccess } = useGetMyProfileQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (isMyProfileFetchSuccess && myProfile.data.role?.permissionLevel !== PermissionLevel.SUPER)
      navigate(`${RouteConstants.employee}`, { replace: true });
  }, [isMyProfileFetchSuccess]);

  const { id } = useParams();

  const { data: employeesData, isSuccess: isEmployeeFetchSuccess } = useGetEmployeeByIdQuery(id);

  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    if (isEmployeeFetchSuccess) setEmployee(employeesData.data);
  }, [isEmployeeFetchSuccess]);

  return (
    <HomeLayout
      subHeaderPrimaryAction={null}
      subHeaderLabel='Edit Employee'
      subHeaderPrimaryActionLabel=''
      subHeaderPrimaryActionIcon=''
    >
      <EmployeeForm employee={employee} isEdit={true} />
    </HomeLayout>
  );
};

export default EmployeeEditPage;
