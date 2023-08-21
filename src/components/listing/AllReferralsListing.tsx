import React, { useEffect, useState } from 'react';
import ReferralListItem from '../list-item/ReferralListItem';
import { useGetAllReferralsListQuery } from '../../services/referralApi';
import './AllReferralsListing.css';

type AllReferralsListingPropsType = {
  labels: string[];
  searchLabel?: string;
};

const AllReferralsListing: React.FC<AllReferralsListingPropsType> = (props) => {
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

    setReferrals(newreferrals);

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

export default AllReferralsListing;
