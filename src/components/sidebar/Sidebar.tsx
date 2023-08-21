import React from 'react';
import './Sidebar.css';
import SideBarButton from '../button/SideBarButton/SideBarButton';
import { RouteConstants } from '../../constants/routeConstants';

const Sidebar: React.FC = () => {
  return (
    <div className='sidebar'>
      <div className='sidebar-items'>
        <SideBarButton
          route={RouteConstants.employee}
          imgIcon='/assets/icons/employees.svg'
          headerText='Employee List'
        />
        <SideBarButton
          route={RouteConstants.opening}
          imgIcon='/assets/icons/job_icon.png'
          headerText='Job Openings'
        />
        <SideBarButton
          route={RouteConstants.myReferral}
          imgIcon='/assets/icons/my_referrals.png'
          headerText='My Referrals'
        />
        <SideBarButton
          route={RouteConstants.referral}
          imgIcon='/assets/icons/all_referrals.png'
          headerText='All Referrals'
        />
      </div>
    </div>
  );
};

export default Sidebar;
