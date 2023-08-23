import React, { useContext, useEffect, useState } from 'react';
import {
  useGetApplicationsQuery,
  useLazyGetApplicationsQuery
} from '../../services/applicationApi';
import ApplicationListItem from '../list-item/ApplicationListItem';
import { SelectedContext } from '../../app';

type ApplicationsListingPropsType = {
  labels: string[];
  searchLabel?: string;
  emailValue?: string;
  roleValue?: string;
  openingId: string;
};

const ApplicationsListing: React.FC<ApplicationsListingPropsType> = (props) => {
  const [applications, setApplications] = useState([]);
  const [getApplications, { data: lazyData, isSuccess: isLazySuccess }] =
    useLazyGetApplicationsQuery();
  const { data, isSuccess } = useGetApplicationsQuery({
    email: props.emailValue,
    role: props.roleValue === 'All' ? '' : props.roleValue
  });
  const [isRoutedFromOpening, setIsRoutedFromOpening] = useState(false);
  const { selectedTabIndex } = useContext(SelectedContext);

  useEffect(() => {
    if (location.pathname.includes('opening')) setIsRoutedFromOpening(true);
    else setIsRoutedFromOpening(false);
  }, [selectedTabIndex]);

  useEffect(() => {
    if (isRoutedFromOpening) getApplications({ openingId: props.openingId });
  }, [isRoutedFromOpening]);

  useEffect(() => {
    if (isSuccess || isLazySuccess)
      setApplications(
        (isRoutedFromOpening ? lazyData : data)?.data.map((application) => (
          <ApplicationListItem key={application.id} application={application}></ApplicationListItem>
        ))
      );
  }, [isSuccess, isLazySuccess, data, lazyData]);

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
          <tbody className='list-items'>{applications}</tbody>
        </table>
      </div>
    </>
  );
};

export default ApplicationsListing;
