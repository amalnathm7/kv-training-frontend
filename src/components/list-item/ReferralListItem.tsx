import { ReferralType } from '../../types/ReferralType';
import React from 'react';
type ReferralListItemPropsType = {
  referral: ReferralType;
};

const ReferralListItem: React.FC<ReferralListItemPropsType> = (props) => {
  return (
    <tr className='list-item'>
      <td>{props.referral.id}</td>
      <td>{props.referral.name}</td>
      <td>{props.referral.email}</td>
      <td>{props.referral.experience}</td>
      <td>{props.referral.status}</td>
      <td>{props.referral.opening.id}</td>
      <td>{props.referral.referredBy.id}</td>
      <td>{props.referral.role.id}</td>
    </tr>
  );
};

export default ReferralListItem;
