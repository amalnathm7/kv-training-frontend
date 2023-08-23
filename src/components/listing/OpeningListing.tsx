import React, { useEffect, useState } from 'react';
import './Listing.css';
import OpeningListItem from '../list-item/OpeningListItem';
import { useGetOpeningListQuery } from '../../services/openingApi';
import { OpeningType } from '../../types/OpeningType';

type OpeningListingPropsType = {
  labels: string[];
};

const OpeningListing: React.FC<OpeningListingPropsType> = (props) => {
  const [openings, setOpenings] = useState<OpeningType[]>([]);
  const { data: openingData, isSuccess } = useGetOpeningListQuery();

  const labels = props.labels.map((label) => (
    <td className='listing-label' key={label}>
      <label>{label}</label>
    </td>
  ));

  useEffect(() => {
    if (isSuccess) setOpenings(openingData.data);
  }, [isSuccess, openingData]);

  return (
    <>
      <div className='listing-spacing'></div>
      <div className='listing'>
        <table>
          <thead>
            <tr className='list-header'>{labels}</tr>
          </thead>
          {openings?.length === 0 && (
            <tbody>
              <tr>
                <td>
                  <label style={{ alignItems: 'center', marginTop: '20px' }} className='list-items'>
                    No Openings
                  </label>
                </td>
              </tr>
            </tbody>
          )}
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
