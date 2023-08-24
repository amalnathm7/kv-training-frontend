import HomeLayout from '../../layouts/home-layout/HomeLayout';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { PermissionLevel } from '../../utils/PermissionLevel';
import ApplicationForm from '../../components/form/ApplicationForm';
import { useGetApplicationByIdQuery } from '../../services/applicationApi';
import { ApplicationType } from '../../types/ApplicationType';
import { SelectedContext } from '../../app';

const ApplicationEditPage: React.FC = () => {
  const { myProfile } = useContext(SelectedContext);
  const navigate = useNavigate();

  const { id } = useParams();
  const { data: applicationData, isSuccess: isApplicationByIdFetchSuccess } =
    useGetApplicationByIdQuery(id);
  const [application, setApplication] = useState<ApplicationType>(null);

  useEffect(() => {
    if (myProfile && isApplicationByIdFetchSuccess) {
      const isNotAuthorized =
        !myProfile?.role || myProfile?.role.permissionLevel !== PermissionLevel.SUPER;

      if (isNotAuthorized) navigate(-1);
    }
  }, [myProfile, isApplicationByIdFetchSuccess]);

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
