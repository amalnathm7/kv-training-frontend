import HomeLayout from '../../layouts/home-layout/HomeLayout';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useGetMyProfileQuery } from '../../services/employeeApi';
import { PermissionLevel } from '../../utils/PermissionLevel';
import ApplicationForm from '../../components/form/ApplicationForm';
import { useGetApplicationByIdQuery } from '../../services/applicationApi';
import { ApplicationType } from '../../types/ApplicationType';

const ApplicationEditPage: React.FC = () => {
  const { data: myProfile, isSuccess: isMyProfileFetchSuccess } = useGetMyProfileQuery();
  const navigate = useNavigate();

  const { id } = useParams();
  const { data: applicationData, isSuccess: isApplicationByIdFetchSuccess } =
    useGetApplicationByIdQuery(id);
  const [application, setApplication] = useState<ApplicationType>(null);

  useEffect(() => {
    if (isMyProfileFetchSuccess && isApplicationByIdFetchSuccess) {
      const isNotAuthorized =
        !myProfile.data.role || myProfile.data.role.permissionLevel !== PermissionLevel.SUPER;

      if (isNotAuthorized) navigate(-1);
    }
  }, [isMyProfileFetchSuccess, isApplicationByIdFetchSuccess]);

  useEffect(() => {
    if (isApplicationByIdFetchSuccess) setApplication(applicationData.data);
  }, [isApplicationByIdFetchSuccess]);

  return (
    <HomeLayout
      subHeaderPrimaryAction={null}
      subHeaderLabel='Edit Application'
      subHeaderPrimaryActionLabel=''
      subHeaderPrimaryActionIcon=''
    >
      <ApplicationForm opening={application?.opening} application={application} isEdit={true} />
    </HomeLayout>
  );
};

export default ApplicationEditPage;
