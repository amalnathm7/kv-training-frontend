import React, { useEffect, useState } from 'react';
import ReferralListItem from '../list-item/ReferralListItem';
import {
  useLazyGetAllReferralsQuery,
  useLazyGetMyReferralsQuery
} from '../../services/referralApi';
import Pagination from '../pagination/Pagination';

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
  const [page, setPage] = useState(1);
  const [isRoutedFromOpening, setIsRoutedFromOpening] = useState(false);
  const [
    getMyReferrals,
    { data: myReferralsData, isSuccess: isMyReferralsSuccess, isLoading: isMyReferralsLoading }
  ] = useLazyGetMyReferralsQuery();
  const [
    getAllReferrals,
    { data: allReferralsData, isSuccess: isAllReferralsSuccess, isLoading: isAllReferralsLoading }
  ] = useLazyGetAllReferralsQuery();
  const isMyReferrals = props.selection === 'my';

  useEffect(() => {
    if (location.pathname.includes('opening')) setIsRoutedFromOpening(true);
    else setIsRoutedFromOpening(false);
  }, []);

  useEffect(() => {
    if (isRoutedFromOpening) getAllReferrals({ openingId: props.openingId, offset: page - 1 });
    else if (isMyReferrals) getMyReferrals();
    else
      getAllReferrals({
        email: props.emailValue,
        role: props.roleValue === 'All' ? '' : props.roleValue,
        offset: page - 1
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

  useEffect(() => {
    if (typeof page !== 'string') getAllReferrals({ offset: page - 1 });
  }, [page]);

  return (
    <>
      <div className='listing-spacing'></div>
      <div className='listing'>
        <table>
          <thead>
            <tr className='list-header'>{labels}</tr>
            {(!isMyReferrals || isRoutedFromOpening) && (
              <tr className='list-pagination'>
                <Pagination
                  page={page}
                  setPage={setPage}
                  length={allReferralsData?.meta.length}
                  total={allReferralsData?.meta.total}
                />
              </tr>
            )}
          </thead>
          <tbody>
            <tr>
              <td>
                {(isMyReferralsLoading || isAllReferralsLoading) && (
                  <label style={{ alignItems: 'center', marginTop: '20px' }} className='list-items'>
                    Loading...
                  </label>
                )}
                {referrals?.length === 0 && !isMyReferralsLoading && !isAllReferralsLoading && (
                  <label style={{ alignItems: 'center', marginTop: '20px' }} className='list-items'>
                    No Referrals
                  </label>
                )}
              </td>
            </tr>
          </tbody>
          <tbody className='list-items'>{referrals}</tbody>
        </table>
      </div>
    </>
  );
};

export default ReferralsListing;
