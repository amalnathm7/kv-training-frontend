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
  const [emailValue, setEmailValue] = useState('');
  const [roleValue, setRoleValue] = useState('');
  const { data, isSuccess } =
    props.selection === 'my'
      ? useGetMyReferralsQuery()
      : useGetAllReferralsListQuery({ email: emailValue, role: roleValue });

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
  const handleSearch = (e) => {
    setEmailValue(e.target.value);
  };

  return (
    <>
      {props.searchLabel === 'Search' && (
        <>
          <div className='search-button'>
            <div className='sub-header-action-icon-container'>
              <img className='sub-header-action-icon' src={'/assets/icons/' + 'search.png'}></img>
            </div>
            <input
              className='sub-header-action-label'
              style={{ fontSize: '14px', cursor: 'text' }}
              value={emailValue}
              placeholder='Search referral by Email'
              onChange={handleSearch}
            />
          </div>
          <div className='roleFilter'>
            <select className='role-dropdown' onChange={(e) => setRoleValue(e.target.value)}>
              <option value='' disabled selected>
                Role
              </option>
              <option value='HR Manager'>HR Manager</option>
              <option value='Front-end Developer'>Front-end Developer</option>
            </select>
          </div>
        </>
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
