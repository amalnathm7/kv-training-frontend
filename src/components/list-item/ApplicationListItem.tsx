import React, { useEffect, useState } from 'react';
import StatusIcon from '../status-icon/StatusIcon';
import { StatusType } from '../../types/StatusType';
import { StatusColor } from '../../constants/statusColorConstants';
import ActionButton from '../button/ActionButton/ActionButton';
import CustomPopup from '../popup/CustomPopup';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from '../../constants/routeConstants';
import { useDeleteApplicationMutation } from '../../services/applicationApi';
import { PermissionLevel } from '../../utils/PermissionLevel';
import { useGetMyProfileQuery } from '../../services/employeeApi';
import { toast } from 'react-toastify';
import { ApplicationType } from '../../types/ApplicationType';
import viewFile from '../../utils/viewFile';
import { useGetFileUrlQuery } from '../../services/fileApi';

type ApplicationListItemPropsType = {
  application: ApplicationType;
};

const ApplicationListItem: React.FC<ApplicationListItemPropsType> = (props) => {
  const { data: myProfile, isSuccess: isMyProfileFetchSuccess } = useGetMyProfileQuery();
  const { data: resumeUrl } = useGetFileUrlQuery({
    fileName: props.application.resume
  });
  const [isSuperAuthorized, setIsSuperAuthorized] = useState(false);

  useEffect(() => {
    if (isMyProfileFetchSuccess && myProfile.data.role?.permissionLevel === PermissionLevel.SUPER)
      setIsSuperAuthorized(true);
  }, [isMyProfileFetchSuccess]);

  let status: StatusType = {
    label: props.application.status,
    color: StatusColor[props.application.status]
  };

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`${RouteConstants.application}/${props.application.id}/edit`);
  };

  const handleDelete = () => {
    if (deleteError) toast.error('Candidate has been moved to further stages');
    else setShowDeletePopup(true);
  };

  const onClick = () => {
    navigate(`${RouteConstants.application}/${props.application.id}`);
  };

  const [deleteError, setDeleteError] = useState(false);

  const onConfirmDelete = () => {
    deleteApplication(props.application.id);
  };

  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const [deleteApplication, { isSuccess: isDeleteSuccess }] = useDeleteApplicationMutation();

  useEffect(() => {
    if (!isSuperAuthorized && props.application.status !== 'Received') setDeleteError(true);
    else setDeleteError(false);
  }, [isSuperAuthorized, props.application.status]);

  useEffect(() => {
    if (isDeleteSuccess) {
      setShowDeletePopup(false);
      toast.success('Successfully deleted application');
    }
  }, [isDeleteSuccess]);

  return (
    <tr className='list-item' onClick={onClick}>
      {isSuperAuthorized && <td>{props.application.candidateCode}</td>}
      <td>{props.application.name}</td>
      <td>{props.application.email}</td>
      <td>{props.application.phone}</td>
      <td>
        {props.application.experience == 1
          ? props.application.experience + ' year'
          : props.application.experience + ' years'}
      </td>
      <td>
        <StatusIcon status={status}></StatusIcon>
      </td>
      <td>{props.application.opening?.title}</td>
      <td>{props.application.role.role}</td>
      <td
        onClick={(event) => {
          event.stopPropagation();
          viewFile(resumeUrl);
        }}
      >
        <u>View Resume</u>
      </td>
      {isSuperAuthorized && (
        <td>
          <ActionButton icon='delete.png' onClick={handleDelete}></ActionButton>
          <ActionButton icon='edit.png' onClick={handleEdit}></ActionButton>
        </td>
      )}
      {showDeletePopup && (
        <CustomPopup
          onConfirm={onConfirmDelete}
          onCancel={() => {
            setShowDeletePopup(false);
          }}
          subtext='Do you really want to delete the application?'
        />
      )}
    </tr>
  );
};

export default ApplicationListItem;
