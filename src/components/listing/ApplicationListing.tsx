import React, { useEffect, useState } from 'react';
import {
  useGetAllApplicationsListQuery,
  useGetMyApplicationsQuery
} from '../../services/applicationApi';
import ApplicationListItem from '../list-item/ApplicationListItem';

type ApplicationsListingPropsType = {
  labels: string[];
  searchLabel?: string;
  emailValue?: string;
  roleValue?: string;
  selection: 'my' | 'all';
};

const ApplicationsListing: React.FC<ApplicationsListingPropsType> = (props) => {
  const [applications, setApplications] = useState([]);
  const { data, isSuccess } =
    props.selection === 'my'
      ? useGetMyApplicationsQuery()
      : useGetAllApplicationsListQuery({
          email: props.emailValue,
          role: props.roleValue === 'All' ? '' : props.roleValue
        });

  useEffect(() => {
    setApplications(
      data?.data.map((application) => (
        <ApplicationListItem
          key={application.id}
          application={application}
          selection={props.selection}
        ></ApplicationListItem>
      ))
    );
  }, [isSuccess, data]);

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
