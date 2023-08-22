import React, { useEffect, useState } from 'react';
import ReferralListItem from '../list-item/ReferralListItem';
import { useGetAllReferralsListQuery, useGetMyReferralsQuery } from '../../services/referralApi';

type ReferralsListingPropsType = {
  labels: string[];
  searchLabel?: string;
  emailValue?: string;
  roleValue?: string;
  selection: 'my' | 'all';
};

const ReferralsListing: React.FC<ReferralsListingPropsType> = (props) => {
  const [referrals, setReferrals] = useState([]);
  const { data, isSuccess } =
    props.selection === 'my'
      ? useGetMyReferralsQuery()
      : useGetAllReferralsListQuery({
          email: props.emailValue,
          role: props.roleValue === 'All' ? '' : props.roleValue
        });

  useEffect(() => {
    setReferrals(
      data?.data.map((referral) => (
        <ReferralListItem
          key={referral.id}
          referral={referral}
          selection={props.selection}
        ></ReferralListItem>
      ))
    );
  }, [isSuccess, data]);

  const labels = props.labels.map((label) => (
    <td className='listing-label' key={label}>
      <label>{label}</label>
    </td>
  ));

  return (
    <>
      <div className='listing-spacing'></div>
      <div className='listing'>
        <table>
          <thead>
            <tr className='list-header'>{labels}</tr>
          </thead>
          <tbody className='list-items'>{referrals}</tbody>
        </table>
      </div>
    </>
  );
};

export default ReferralsListing;
