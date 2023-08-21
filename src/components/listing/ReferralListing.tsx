import React, { useEffect, useState } from 'react';
import ReferralListItem from '../list-item/ReferralListItem';
import { useGetAllReferralsListQuery, useGetMyReferralsQuery } from '../../services/referralApi';
import './AllReferralsListing.css';

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
        <ReferralListItem key={referral.id} referral={referral}></ReferralListItem>
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
        <ReferralListItem key={newReferral.id} referral={newReferral}></ReferralListItem>
      ))
    );
  };

  return (
    <>
      {props.searchLabel === 'Search' && (
        <div className='search-button'>
          <div className='sub-header-action-icon-container'>
            <img className='sub-header-action-icon' src={'/assets/icons/' + 'searchicon.jpg'}></img>
          </div>
          {/* <label className='sub-header-action-label'>Search</label> */}
          <input
            className='sub-header-action-label'
            value={inputValue}
            placeholder='Search'
            onChange={handleSearch}
          />
        </div>
      )}
      <div className='listing'>
        <table>
          <thead className='list-header'>{labels}</thead>
          <tbody className='list-items'>{referrals}</tbody>
        </table>
      </div>
    </>
  );
};

export default ReferralsListing;
