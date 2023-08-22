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

type ApplicationListItemPropsType = {
  application: ApplicationType;
  selection: 'my' | 'all';
};

const ApplicationListItem: React.FC<ApplicationListItemPropsType> = (props) => {
  const { data: myProfile, isSuccess: isMyProfileFetchSuccess } = useGetMyProfileQuery();
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
    {
      props.selection === 'my'
        ? navigate(`${RouteConstants.application}/${props.application.id}/edit`)
        : navigate(`${RouteConstants.application}/${props.application.id}/edit`);
    }
  };

  const handleDelete = () => {
    if (deleteError) toast.error('Candidate has been moved to further stages');
    else setShowDeletePopup(true);
  };

  const onClick = () => {
    {
      props.selection === 'my'
        ? navigate(`${RouteConstants.application}/${props.application.id}`)
        : navigate(`${RouteConstants.application}/${props.application.id}`);
    }
  };

  const [deleteError, setDeleteError] = useState(false);

  const onConfirmDelete = () => {
    deleteApplication(props.application.id);
  };

  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const [deleteApplication, { isSuccess: isDeleteSuccess }] = useDeleteApplicationMutation();

  useEffect(() => {
    if (props.application.status !== 'Received') setDeleteError(true);
    else setDeleteError(false);
  }, [props.application.status]);

  useEffect(() => {
    setShowDeletePopup(false);
  }, [isDeleteSuccess]);

  return (
    <tr className='list-item' onClick={onClick}>
      <td>{props.application.id}</td>
      <td>{props.application.name}</td>
      <td>{props.application.email}</td>
      <td>
        {props.application.experience == 1
          ? props.application.experience + ' year'
          : props.application.experience + ' years'}
      </td>
      <td>
        <StatusIcon status={status}></StatusIcon>
      </td>
      <td>{props.application.opening.title}</td>
      <td>{props.application.role.role}</td>
      {props.selection === 'all' && <td>{props.application.referredBy.name}</td>}
      {(props.selection === 'my' || isSuperAuthorized) && (
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
