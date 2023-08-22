import React, { useEffect, useState } from 'react';
import ReferralListItem from '../list-item/ReferralListItem';
import { useGetAllReferralsListQuery, useGetMyReferralsQuery } from '../../services/referralApi';

type ReferralsListingPropsType = {
  labels: string[];
  searchLabel?: string;
  selection: 'my' | 'all';
};

const ReferralsListing: React.FC<ReferralsListingPropsType> = (props) => {
  const [referrals, setReferrals] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const { data, isSuccess } =
    props.selection === 'my' ? useGetMyReferralsQuery() : useGetAllReferralsListQuery();

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
  }, [isSuccess]);

  const labels = props.labels.map((label) => (
    <td className='listing-label' key={label}>
      <label>{label}</label>
    </td>
  ));

  const handleSearch = (e) => {
    setInputValue(e.target.value);
    const newreferrals = data?.data.filter(
      (referral) =>
        String(referral.id).includes(e.target.value) ||
        String(referral.email).includes(e.target.value) ||
        String(referral.opening.title).includes(e.target.value) ||
        String(referral.role.role).includes(e.target.value) ||
        String(referral.name).includes(e.target.value)
    );

    setReferrals(
      newreferrals.map((newReferral) => (
        <ReferralListItem
          key={newReferral.id}
          referral={newReferral}
          selection={props.selection}
        ></ReferralListItem>
      ))
    );
  };

  return (
    <>
      {props.searchLabel === 'Search' && (
        <div className='search-button'>
          <div className='sub-header-action-icon-container'>
            <img className='sub-header-action-icon' src={'/assets/icons/' + 'search.png'}></img>
          </div>
          {/* <label className='sub-header-action-label'>Search</label> */}
          <input
            className='sub-header-action-label'
            style={{ fontSize: '14px', cursor: 'text' }}
            value={inputValue}
            placeholder='Search referral'
            onChange={handleSearch}
          />
        </div>
      )}
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
