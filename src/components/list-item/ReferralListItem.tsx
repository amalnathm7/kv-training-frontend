import { ReferralType } from '../../types/ReferralType';
import React, { useContext, useEffect, useState } from 'react';
import StatusIcon from '../status-icon/StatusIcon';
import { StatusType } from '../../types/StatusType';
import { StatusColor } from '../../constants/statusConstants';
import ActionButton from '../button/ActionButton/ActionButton';
import CustomPopup from '../popup/CustomPopup';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from '../../constants/routeConstants';
import { useApproveReferralMutation, useDeleteReferralMutation } from '../../services/referralApi';
import { toast } from 'react-toastify';
import viewFile from '../../utils/viewFile';
import { useLazyGetFileUrlQuery } from '../../services/fileApi';
import { AuthorizationContext } from '../../app';

type ReferralListItemPropsType = {
  referral: ReferralType;
  selection: 'my' | 'all';
};

const ReferralListItem: React.FC<ReferralListItemPropsType> = (props) => {
  const { isSuperAuthorized } = useContext(AuthorizationContext);
  const [getFile, { data: resumeUrl }] = useLazyGetFileUrlQuery();

  useEffect(() => {
    if (resumeUrl) viewFile(resumeUrl);
  }, [resumeUrl]);

  let status: StatusType = {
    label: props.referral.status,
    color: StatusColor[props.referral.status.replace(' ', '_')]
  };

  let bonusStatus: StatusType = {
    label: props.referral.bonusStatus,
    color: StatusColor[props.referral.bonusStatus.replace(' ', '_')]
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

  const handleApprove = () => {
    const bonusStatus = props.referral.bonusStatus;

    if (bonusStatus === 'Processing' || bonusStatus === 'Eligible') setShowApprovePopup(true);
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

  const [approveReferral, { isSuccess: isApproveReferralSucess, isError: isApproveReferralError }] =
    useApproveReferralMutation();

  const onConfirmApprove = () => {
    approveReferral({ id: props.referral.id });
  };

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showApprovePopup, setShowApprovePopup] = useState(false);

  useEffect(() => {
    if (isApproveReferralSucess) {
      setShowApprovePopup(false);
      toast.success('Successfully approved bonus');
    }
  }, [isApproveReferralSucess]);

  useEffect(() => {
    if (isApproveReferralError) {
      setShowApprovePopup(false);
      toast.error('Error approving bonus');
    }
  }, [isApproveReferralError]);

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
      <td>{props.referral.opening?.title ? props.referral.opening?.title : 'nil'}</td>
      <td>{props.referral.role.role}</td>
      <td
        onClick={(event) => {
          event.stopPropagation();
          getFile({
            fileName: props.referral.resume
          });
        }}
      >
        <u>View Resume</u>
      </td>
      {props.selection === 'all' && <td>{props.referral.referredBy.name}</td>}
      <td>
        <StatusIcon status={bonusStatus}></StatusIcon>
      </td>

      {(props.selection === 'my' || isSuperAuthorized) && (
        <td>
          <>
            <a
              data-tooltip-content='Delete Referral'
              data-tooltip-id='tooltip id'
              data-tooltip-place='bottom'
            >
              <ActionButton
                isDisabled={props.referral.status === 'Hired'}
                icon='delete.png'
                onClick={handleDelete}
              ></ActionButton>
            </a>
            <a
              data-tooltip-content='Edit Referral'
              data-tooltip-id='tooltip id'
              data-tooltip-place='bottom'
            >
              <ActionButton
                isDisabled={props.referral.status === 'Hired'}
                icon='edit.png'
                onClick={handleEdit}
              ></ActionButton>
            </a>
            <a
              data-tooltip-content='Approve Bonus'
              data-tooltip-id='tooltip id'
              data-tooltip-place='bottom'
            >
              {props.referral.status === 'Hired' &&
                (props.referral.bonusStatus === 'Eligible' ||
                  props.referral.bonusStatus === 'Processing') && (
                  <ActionButton icon='tick-green.svg' onClick={handleApprove}></ActionButton>
                )}
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
          subtext='Do you really want to delete the referral?'
        />
      )}
      {showApprovePopup && (
        <CustomPopup
          onConfirm={onConfirmApprove}
          onCancel={() => {
            setShowApprovePopup(false);
          }}
          subtext={
            props.referral.bonusStatus === 'Processing'
              ? 'Referral is still being processed. Do you still want to approve the bonus?'
              : 'Do you really want to approve bonus for the referral?'
          }
        />
      )}
    </tr>
  );
};

export default ReferralListItem;
