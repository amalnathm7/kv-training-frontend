import React from 'react';
import './EmployeeListing.css';
import OpeningListItem from '../list-item/OpeningListItem';
import { useGetOpeningListQuery } from '../../services/openingApi';

type OpeningListingPropsType = {
  labels: string[];
};

const OpeningListing: React.FC<OpeningListingPropsType> = (props) => {
  const { data: openingData, isSuccess } = useGetOpeningListQuery();

  const labels = props.labels.map((label) => (
    <td className='listing-label' key={label}>
      <label>{label}</label>
    </td>
  ));

  let openings = [];

  if (isSuccess)
    openings = openingData.data.map((opening) => (
      <OpeningListItem key={opening.id} opening={opening}></OpeningListItem>
    ));

  return (
    <div className='listing'>
      <table>
        <thead className='list-header'>{labels}</thead>
        <tbody className='list-items'>{openings}</tbody>
      </table>
    </div>
  );
};

export default OpeningListing;
