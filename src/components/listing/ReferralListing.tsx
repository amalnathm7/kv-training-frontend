import React, { useEffect, useState } from 'react';
import ReferralListItem from '../list-item/ReferralListItem';
import {
  useLazyGetAllReferralsQuery,
  useLazyGetMyReferralsQuery
} from '../../services/referralApi';

type ReferralsListingPropsType = {
  labels: string[];
  searchLabel?: string;
  emailValue?: string;
  roleValue?: string;
  selection: 'my' | 'all';
  openingId: string;
};

const ReferralsListing: React.FC<ReferralsListingPropsType> = (props) => {
  const [referrals, setReferrals] = useState([]);
  const [isRoutedFromOpening, setIsRoutedFromOpening] = useState(false);
  const [getMyReferrals, { data: myReferralsData, isSuccess: isMyReferralsSuccess }] =
    useLazyGetMyReferralsQuery();
  const [getAllReferrals, { data: allReferralsData, isSuccess: isAllReferralsSuccess }] =
    useLazyGetAllReferralsQuery();
  const isMyReferrals = props.selection === 'my';

  useEffect(() => {
    if (location.pathname.includes('opening')) setIsRoutedFromOpening(true);
    else setIsRoutedFromOpening(false);
  }, []);

  useEffect(() => {
    if (isRoutedFromOpening) getAllReferrals({ openingId: props.openingId });
    else if (isMyReferrals) getMyReferrals();
    else
      getAllReferrals({
        email: props.emailValue,
        role: props.roleValue === 'All' ? '' : props.roleValue
      });
  }, [isRoutedFromOpening, props.roleValue, props.emailValue, props.openingId]);

  useEffect(() => {
    if (isAllReferralsSuccess || isMyReferralsSuccess)
      setReferrals(
        (isMyReferrals && !isRoutedFromOpening ? myReferralsData : allReferralsData)?.data.map(
          (referral) => (
            <ReferralListItem
              key={referral.id}
              referral={referral}
              selection={props.selection}
            ></ReferralListItem>
          )
        )
      );
  }, [isAllReferralsSuccess, allReferralsData, isMyReferralsSuccess, myReferralsData]);

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
          {referrals?.length === 0 && (
            <tbody>
              <tr>
                <td>
                  <label style={{ alignItems: 'center', marginTop: '20px' }} className='list-items'>
                    No Referrals
                  </label>
                </td>
              </tr>
            </tbody>
          )}
          <tbody className='list-items'>{referrals}</tbody>
        </table>
      </div>
    </>
  );
};

export default ReferralsListing;
