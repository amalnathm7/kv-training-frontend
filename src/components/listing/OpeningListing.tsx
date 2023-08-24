import React, { useEffect, useState } from 'react';
import './Listing.css';
import OpeningListItem from '../list-item/OpeningListItem';
import { useLazyGetOpeningListQuery } from '../../services/openingApi';
import { OpeningType } from '../../types/OpeningType';
import Pagination from '../pagination/Pagination';

type OpeningListingPropsType = {
  labels: string[];
};

const OpeningListing: React.FC<OpeningListingPropsType> = (props) => {
  const [openings, setOpenings] = useState<OpeningType[]>([]);
  const [page, setPage] = useState(1);
  const [getOpenings, { data: openingsData, isSuccess, isLoading }] = useLazyGetOpeningListQuery();

  const labels = props.labels.map((label) => (
    <td className='listing-label' key={label}>
      <label>{label}</label>
    </td>
  ));

  useEffect(() => {
    if (isSuccess) setOpenings(openingsData.data);
  }, [isSuccess, openingsData]);

  useEffect(() => {
    if (typeof page !== 'string') getOpenings({ offset: page - 1 });
  }, [page]);

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
                length={openingsData?.meta.length}
                total={openingsData?.meta.total}
              />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {isLoading && (
                  <label style={{ alignItems: 'center', marginTop: '20px' }} className='list-items'>
                    Loading...
                  </label>
                )}
                {openings?.length === 0 && !isLoading && (
                  <label style={{ alignItems: 'center', marginTop: '20px' }} className='list-items'>
                    No Openings
                  </label>
                )}
              </td>
            </tr>
          </tbody>
          <tbody className='list-items'>
            {openings.map((opening) => (
              <OpeningListItem key={opening.id} opening={opening}></OpeningListItem>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OpeningListing;
