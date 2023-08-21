import { ReferralType } from '../../types/ReferralType';
import React from 'react';
import StatusIcon from '../status-icon/StatusIcon';
import { StatusType } from '../../types/StatusType';
import { StatusColour } from '../../utils/StatusColour';
type ReferralListItemPropsType = {
  referral: ReferralType;
  selection: 'my' | 'all';
};

const ReferralListItem: React.FC<ReferralListItemPropsType> = (props) => {
  let status: StatusType = {
    label: props.referral.status,
    color: StatusColour[props.referral.status]
  };

  return (
    <tr className='list-item'>
      <td>{props.referral.id}</td>
      <td>{props.referral.name}</td>
      <td>{props.referral.email}</td>
      <td>{props.referral.experience}</td>
      <td>
        <StatusIcon status={status}></StatusIcon>
      </td>
      <td>{props.referral.opening.title}</td>
      <td>{props.referral.role.role}</td>
      {props.selection !== 'my' && <td>{props.referral.referredBy.name}</td>}
      {/* {isSuperAuthorized && (
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
          subtext='Do you really want to delete the employee?'
        />
      )} */}
    </tr>
  );
};

export default ReferralListItem;
