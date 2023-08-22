import { ReferralType } from '../../types/ReferralType';
import React, { useEffect, useState } from 'react';
import StatusIcon from '../status-icon/StatusIcon';
import { StatusType } from '../../types/StatusType';
import { StatusColor } from '../../constants/statusColorConstants';
import ActionButton from '../button/ActionButton/ActionButton';
import CustomPopup from '../popup/CustomPopup';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from '../../constants/routeConstants';
import { useDeleteReferralMutation } from '../../services/referralApi';
import { PermissionLevel } from '../../utils/PermissionLevel';
import { useGetMyProfileQuery } from '../../services/employeeApi';
type ReferralListItemPropsType = {
  referral: ReferralType;
  selection: 'my' | 'all';
};

const ReferralListItem: React.FC<ReferralListItemPropsType> = (props) => {
  const { data: myProfile, isSuccess: isMyProfileFetchSuccess } = useGetMyProfileQuery();
  const [isSuperAuthorized, setIsSuperAuthorized] = useState(false);

  useEffect(() => {
    if (isMyProfileFetchSuccess && myProfile.data.role?.permissionLevel === PermissionLevel.SUPER)
      setIsSuperAuthorized(true);
  }, [isMyProfileFetchSuccess]);

  let status: StatusType = {
    label: props.referral.status,
    color: StatusColor[props.referral.status]
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
    setShowDeletePopup(true);
  };

  const onClick = () => {
    {
      props.selection === 'my'
        ? navigate(`${RouteConstants.myReferral}/${props.referral.id}`)
        : navigate(`${RouteConstants.referral}/${props.referral.id}`);
    }
  };

  const onConfirmDelete = () => {
    deleteReferral(props.referral.id);
  };

  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const [deleteReferral, { isSuccess: isDeleteSuccess }] = useDeleteReferralMutation();

  useEffect(() => {
    setShowDeletePopup(false);
  }, [isDeleteSuccess]);

  return (
    <tr className='list-item' onClick={onClick}>
      <td>{props.referral.id}</td>
      <td>{props.referral.name}</td>
      <td>{props.referral.email}</td>
      <td>
        {props.referral.experience == 1
          ? props.referral.experience + ' year'
          : props.referral.experience + ' years'}
      </td>
      <td>
        <StatusIcon status={status}></StatusIcon>
      </td>
      <td>{props.referral.opening.title}</td>
      <td>{props.referral.role.role}</td>
      {props.selection === 'all' && <td>{props.referral.referredBy.name}</td>}
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
          subtext='Do you really want to delete the referral?'
        />
      )}
    </tr>
  );
};

export default ReferralListItem;
