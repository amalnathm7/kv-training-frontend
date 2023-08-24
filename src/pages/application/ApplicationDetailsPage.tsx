import Card from '../../components/card/Card';
import HomeLayout from '../../layouts/home-layout/HomeLayout';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetMyProfileQuery } from '../../services/employeeApi';
import { PermissionLevel } from '../../utils/PermissionLevel';
import { useGetApplicationByIdQuery } from '../../services/applicationApi';
import { CardItemPropsType } from '../../components/card-item/CardItem';
import { useGetFileUrlQuery } from '../../services/fileApi';

const ApplicationDetailsPage: React.FC = () => {
  const { data: myProfile, isSuccess: isMyProfileFetchSuccess } = useGetMyProfileQuery();
  const [isSuperAuthorized, setIsSuperAuthorized] = useState(false);

  useEffect(() => {
    if (isMyProfileFetchSuccess && myProfile.data.role?.permissionLevel === PermissionLevel.SUPER)
      setIsSuperAuthorized(true);
  }, [isMyProfileFetchSuccess]);

  const { id } = useParams();
  const navigate = useNavigate();

  const { data: applicationData, isSuccess } = useGetApplicationByIdQuery(id);
  const { data: resumeUrl } = useGetFileUrlQuery({
    fileName: applicationData?.data.resume
  });

  let items: CardItemPropsType[] = [];

  if (isSuccess) {
    const application = applicationData.data;

    items = [
      {
        label: 'Application Code',
        value: application.candidateCode
      },
      {
        label: 'Name',
        value: application.name
      },
      {
        label: 'Email',
        value: application.email
      },

      {
        label: 'Experience',
        value: application.experience + ' Years'
      },
      {
        label: 'Phone',
        value: application.phone
      },

      {
        label: 'Role',
        value: application.role ? application.role.role : 'NIL'
      },
      {
        label: 'Status',
        value: application.status,
        isStatus: true
      },
      {
        label: 'Opening Title',
        value: application.opening ? application.opening.title : 'NIL'
      },
      {
        label: 'Address',
        value:
          application.address.line1 +
          ', ' +
          application.address.line2 +
          ', ' +
          application.address.city +
          ', ' +
          application.address.state +
          ', ' +
          application.address.country +
          ', ' +
          application.address.pincode
      },
      {
        label: 'Resume',
        value: 'View Resume',
        filePath: resumeUrl
      }
    ];
  }

  const onEditClicked = () => {
    navigate(window.location.pathname + '/edit');
  };

  return (
    <HomeLayout
      subHeaderPrimaryAction={isSuperAuthorized ? onEditClicked : null}
      subHeaderLabel='Application Details'
      subHeaderPrimaryActionLabel={isSuperAuthorized ? 'Edit' : ''}
      subHeaderPrimaryActionIcon={isSuperAuthorized ? 'edit.svg' : ''}
    >
      <Card items={items}></Card>
    </HomeLayout>
  );
};

export default ApplicationDetailsPage;
