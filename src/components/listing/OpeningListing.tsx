import React, { useContext, useEffect, useState } from 'react';
import './Listing.css';
import OpeningListItem from '../list-item/OpeningListItem';
import {
  useLazyGetOpeningListQuery,
  useLazyGetPublicOpeningListQuery
} from '../../services/openingApi';
import { OpeningType } from '../../types/OpeningType';
import Pagination from '../pagination/Pagination';
import { AuthorizationContext } from '../../app';

type OpeningListingPropsType = {
  labels: string[];
};

const OpeningListing: React.FC<OpeningListingPropsType> = (props) => {
  const [openings, setOpenings] = useState<OpeningType[]>([]);
  const [page, setPage] = useState(1);
  const { isSuperAuthorized } = useContext(AuthorizationContext);

  const [
    getOpenings,
    {
      data: openingData,
      isSuccess: isGetOpeningListQuerySuccess,
      isLoading: isGetOpeningListQueryLoading
    }
  ] = useLazyGetOpeningListQuery();

  const [
    getPublicOpenings,
    {
      data: publicOpeningData,
      isSuccess: isGetPublicOpeningListQuerySuccess,
      isLoading: isGetPublicOpeningListQueryLoading
    }
  ] = useLazyGetPublicOpeningListQuery();

  const labels = props.labels.map((label) => (
    <td className='listing-label' key={label}>
      <label>{label}</label>
    </td>
  ));

  useEffect(() => {
    if (typeof page !== 'string') {
      getOpenings({ offset: page - 1 });
      getPublicOpenings({ offset: page - 1 });
    }
  }, [page]);

  useEffect(() => {
    if (isSuperAuthorized && isGetOpeningListQuerySuccess) setOpenings(openingData?.data);
    else setOpenings(publicOpeningData?.data);
  }, [
    isGetOpeningListQuerySuccess,
    openingData,
    isGetPublicOpeningListQuerySuccess,
    publicOpeningData
  ]);

  return (
    <>
      <div className='listing-spacing'></div>
      <div className='listing'>
        <table>
          <thead>
            <tr className='list-header'>{labels}</tr>
            <tr className='list-pagination'>
              <Pagination
                page={page}
                setPage={setPage}
                length={
                  isSuperAuthorized ? openingData?.meta.length : publicOpeningData?.meta.length
                }
                total={
                  isSuperAuthorized ? openingData?.meta.length : publicOpeningData?.meta.length
                }
              />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {(isGetOpeningListQueryLoading || isGetPublicOpeningListQueryLoading) && (
                  <label style={{ alignItems: 'center', marginTop: '20px' }} className='list-items'>
                    Loading...
                  </label>
                )}
                {openings?.length === 0 &&
                  !isGetOpeningListQueryLoading &&
                  !isGetPublicOpeningListQueryLoading && (
                    <label
                      style={{ alignItems: 'center', marginTop: '20px' }}
                      className='list-items'
                    >
                      No Openings
                    </label>
                  )}
              </td>
            </tr>
          </tbody>
          <tbody className='list-items'>
            {openings?.map((opening) => (
              <OpeningListItem key={opening.id} opening={opening}></OpeningListItem>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OpeningListing;
