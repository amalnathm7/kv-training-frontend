import React, { useState } from 'react';
import ReferralListItem from '../list-item/ReferralListItem';
import { useGetAllReferralsListQuery, useGetMyReferralsQuery } from '../../services/referralApi';

type ReferralsListingPropsType = {
  labels: string[];
  selection: 'my' | 'all';
};

const ReferralsListing: React.FC<ReferralsListingPropsType> = (props) => {
  const [referrals, setReferals] = useState([]);

  const { data, isSuccess } =
    props.selection === 'my' ? useGetMyReferralsQuery() : useGetAllReferralsListQuery();

  if (isSuccess)
    setReferals(
      data.data.map((referral) => (
        <ReferralListItem key={referral.id} referral={referral}></ReferralListItem>
      ))
    );

  const labels = props.labels.map((label) => (
    <td className='listing-label' key={label}>
      <label>{label}</label>
    </td>
  ));

  return (
    <div className='listing'>
      <table>
        <thead className='list-header'>{labels}</thead>
        <tbody className='list-items'>{referrals}</tbody>
      </table>
    </div>
  );
};

export default ReferralsListing;
