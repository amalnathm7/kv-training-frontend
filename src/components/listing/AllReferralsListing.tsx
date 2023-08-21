import React from 'react';
import ReferralListItem from '../list-item/ReferralListItem';
import { useGetAllReferralsListQuery } from '../../services/referralApi';

type AllReferralsListingPropsType = {
  labels: string[];
};

const AllReferralsListing: React.FC<AllReferralsListingPropsType> = (props) => {
  const { data: allreferralsData, isSuccess } = useGetAllReferralsListQuery();

  const labels = props.labels.map((label) => (
    <td className='listing-label' key={label}>
      <label>{label}</label>
    </td>
  ));

  let referrals = [];

  if (isSuccess)
    referrals = allreferralsData.data.map((referral) => (
      <ReferralListItem key={referral.id} referral={referral}></ReferralListItem>
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

export default AllReferralsListing;
