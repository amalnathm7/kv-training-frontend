import React, { useContext, useEffect, useState } from 'react';
import { useLazyGetApplicationsQuery } from '../../services/applicationApi';
import ApplicationListItem from '../list-item/ApplicationListItem';
import { SelectedContext } from '../../app';
import Pagination from '../pagination/Pagination';

type ApplicationsListingPropsType = {
  labels: string[];
  searchLabel?: string;
  emailValue?: string;
  roleValue?: string;
  openingId: string;
};

const ApplicationsListing: React.FC<ApplicationsListingPropsType> = (props) => {
  const [applications, setApplications] = useState([]);
  const [page, setPage] = useState(1);
  const [getApplications, { data: applicationsData, isLoading, isSuccess }] =
    useLazyGetApplicationsQuery();
  const [isRoutedFromOpening, setIsRoutedFromOpening] = useState(false);
  const { selectedTabIndex } = useContext(SelectedContext);

  useEffect(() => {
    if (location.pathname.includes('opening')) setIsRoutedFromOpening(true);
    else setIsRoutedFromOpening(false);
  }, [selectedTabIndex]);

  useEffect(() => {
    if (typeof page !== 'string')
      if (isRoutedFromOpening) getApplications({ openingId: props.openingId, offset: page - 1 });
      else
        getApplications({
          email: props.emailValue,
          role: props.roleValue === 'All' ? '' : props.roleValue,
          offset: page - 1
        });
  }, [isRoutedFromOpening, page]);

  useEffect(() => {
    if (isSuccess)
      setApplications(
        applicationsData?.data.map((application) => (
          <ApplicationListItem key={application.id} application={application}></ApplicationListItem>
        ))
      );
  }, [isSuccess, applicationsData, applicationsData]);

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
            <tr className='list-pagination'>
              <Pagination
                page={page}
                setPage={setPage}
                length={applicationsData?.meta.length}
                total={applicationsData?.meta.total}
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
                {applications?.length === 0 && !isLoading && (
                  <label style={{ alignItems: 'center', marginTop: '20px' }} className='list-items'>
                    No Applications
                  </label>
                )}
              </td>
            </tr>
          </tbody>
          <tbody className='list-items'>{applications}</tbody>
        </table>
      </div>
    </>
  );
};

export default ApplicationsListing;
