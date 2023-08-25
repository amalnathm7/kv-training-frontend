import React, { useContext, useEffect, useState } from 'react';
import StatusIcon from '../status-icon/StatusIcon';
import { StatusType } from '../../types/StatusType';
import { StatusColor } from '../../constants/statusConstants';
import ActionButton from '../button/ActionButton/ActionButton';
import CustomPopup from '../popup/CustomPopup';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from '../../constants/routeConstants';
import { useDeleteApplicationMutation } from '../../services/applicationApi';
import { toast } from 'react-toastify';
import { ApplicationType } from '../../types/ApplicationType';
import viewFile from '../../utils/viewFile';
import { useLazyGetFileUrlQuery } from '../../services/fileApi';
import { AuthorizationContext } from '../../app';

type ApplicationListItemPropsType = {
  application: ApplicationType;
};

const ApplicationListItem: React.FC<ApplicationListItemPropsType> = (props) => {
  const [getFile, { data: resumeUrl }] = useLazyGetFileUrlQuery();

  useEffect(() => {
    if (resumeUrl) viewFile(resumeUrl);
  }, [resumeUrl]);

  const { isSuperAuthorized } = useContext(AuthorizationContext);

  let status: StatusType = {
    label: props.application.status,
    color: StatusColor[props.application.status.replace(' ', '_')]
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
      <td>{props.application.candidateCode}</td>
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
      <td>{props.application.opening?.title ? props.application.opening?.title : 'NIL'}</td>
      <td>{props.application.role.role}</td>
      <td
        onClick={(event) => {
          event.stopPropagation();
          getFile({
            fileName: props.application.resume
          });
        }}
      >
        <u>View Resume</u>
      </td>
      {isSuperAuthorized && (
        <td>
          <>
            <a
              data-tooltip-content='Delete Application'
              data-tooltip-id='tooltip id'
              data-tooltip-place='bottom'
            >
              <ActionButton
                isDisabled={props.application.status === 'Hired'}
                icon='delete.png'
                onClick={props.application.status === 'Hired' ? () => {} : handleDelete}
              ></ActionButton>
            </a>
            <a
              data-tooltip-content='Edit Application'
              data-tooltip-id='tooltip id'
              data-tooltip-place='bottom'
            >
              <ActionButton
                isDisabled={
                  props.application.status === 'Hired' || props.application.opening === null
                }
                icon='edit.png'
                onClick={props.application.status === 'Hired' ? () => {} : handleEdit}
              ></ActionButton>
            </a>
          </>
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
