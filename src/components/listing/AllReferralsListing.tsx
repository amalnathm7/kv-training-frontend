import React, { useEffect, useState } from 'react';
import ReferralListItem from '../list-item/ReferralListItem';
import { useGetAllReferralsListQuery } from '../../services/referralApi';
import './AllReferralsListing.css';

type ReferralsListingPropsType = {
  labels: string[];
  searchLabel?: string;
  selection: 'my' | 'all';
};

const ReferralsListing: React.FC<ReferralsListingPropsType> = (props) => {
  const { data: allreferralsData, isSuccess } = useGetAllReferralsListQuery();
  const [inputValue, setInputValue] = useState('');
  const [referrals, setReferrals] = useState([]);

  const labels = props.labels.map((label) => (
    <td className='listing-label' key={label}>
      <label>{label}</label>
    </td>
  ));

  //let referrals = [];

  useEffect(() => {
    setReferrals(
      allreferralsData?.data.map((referral) => (
        <ReferralListItem key={referral.id} referral={referral}></ReferralListItem>
      ))
    );
  }, [isSuccess]);

  const handleSearch = (e) => {
    setInputValue(e.target.value);

    const newreferrals = referrals.filter((referral) =>
      String(referral.id).includes(e.target.value)
    );

    console.log(newreferrals);

    // setReferrals(
    //   newreferrals.map((newreferral) => (
    //     <ReferralListItem key={newreferral.id} referral={newreferral}></ReferralListItem>
    //   ))
    // );

    console.log(referrals);
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
            onChange={(e) => handleSearch(e)}
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
