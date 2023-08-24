import { ReferralType } from '../../types/ReferralType';
import React, { useContext, useEffect, useState } from 'react';
import StatusIcon from '../status-icon/StatusIcon';
import { StatusType } from '../../types/StatusType';
import { StatusColor } from '../../constants/statusConstants';
import ActionButton from '../button/ActionButton/ActionButton';
import CustomPopup from '../popup/CustomPopup';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from '../../constants/routeConstants';
import { useDeleteReferralMutation } from '../../services/referralApi';
import { toast } from 'react-toastify';
import viewFile from '../../utils/viewFile';
import { useGetFileUrlQuery } from '../../services/fileApi';
import { AuthorizationContext } from '../../app';

type ReferralListItemPropsType = {
  referral: ReferralType;
  selection: 'my' | 'all';
};

const ReferralListItem: React.FC<ReferralListItemPropsType> = (props) => {
  const { isSuperAuthorized } = useContext(AuthorizationContext);
  const { data: resumeUrl } = useGetFileUrlQuery({
    fileName: props.referral.resume
  });

  let status: StatusType = {
    label: props.referral.status,
    color: StatusColor[props.referral.status.replace(' ', '_')]
  };

  const navigate = useNavigate();

  const handleEdit = () => {
    {
      props.selection === 'my'
        ? navigate(`${RouteConstants.myReferral}/${props.referral.id}/edit`)
        : navigate(`${RouteConstants.referral}/${props.referral.id}/edit`);
    }
  };

  const handleDelete = () => {
    if (deleteError) toast.error('Candidate has been moved to further stages');
    else setShowDeletePopup(true);
  };

  const onClick = () => {
    {
      props.selection === 'my'
        ? navigate(`${RouteConstants.myReferral}/${props.referral.id}`)
        : navigate(`${RouteConstants.referral}/${props.referral.id}`);
    }
  };

  const [deleteError, setDeleteError] = useState(false);

  const onConfirmDelete = () => {
    deleteReferral(props.referral.id);
  };

  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const [deleteReferral, { isSuccess: isDeleteSuccess }] = useDeleteReferralMutation();

  useEffect(() => {
    if (!isSuperAuthorized && props.referral.status !== 'Received') setDeleteError(true);
    else setDeleteError(false);
  }, [isSuperAuthorized, props.referral.status]);

  useEffect(() => {
    if (isDeleteSuccess) {
      setShowDeletePopup(false);
      toast.success('Successfully deleted referral');
    }
  }, [isDeleteSuccess]);

  return (
    <tr className='list-item' onClick={onClick}>
      <td>{props.referral.candidateCode}</td>
      <td>{props.referral.name}</td>
      <td>{props.referral.email}</td>
      <td>{props.referral.phone}</td>
      <td>
        {props.referral.experience == 1
          ? props.referral.experience + ' year'
          : props.referral.experience + ' years'}
      </td>
      <td>
        <StatusIcon status={status}></StatusIcon>
      </td>
      <td>{props.referral.opening?.title}</td>
      <td>{props.referral.role.role}</td>
      <td
        onClick={(event) => {
          event.stopPropagation();

          viewFile(resumeUrl);
        }}
      >
        <u>View Resume</u>
      </td>
      {props.selection === 'all' && <td>{props.referral.referredBy.name}</td>}
      {(props.selection === 'my' || isSuperAuthorized) && (
        <td>
          <ActionButton
            style={props.referral.status === 'Hired' ? { filter: 'grayscale(100%)' } : {}}
            icon='delete.png'
            onClick={props.referral.status === 'Hired' ? () => {} : handleDelete}
          ></ActionButton>
          <ActionButton
            style={props.referral.status === 'Hired' ? { filter: 'grayscale(100%)' } : {}}
            icon='edit.png'
            onClick={props.referral.status === 'Hired' ? () => {} : handleEdit}
          ></ActionButton>
        </td>
      )}
      {showDeletePopup && (
        <CustomPopup
          onConfirm={onConfirmDelete}
          onCancel={() => {
            setShowDeletePopup(false);
          }}
          subtext='Do you really want to delete the referral?'
        />
      )}
    </tr>
  );
};

export default ReferralListItem;
