import React from 'react';
import './Sidebar.css';
import SideBarButton from '../button/SideBarButton/SideBarButton';

const Sidebar: React.FC = () => {
  return (
    <div className='sidebar'>
      <SideBarButton imgIcon='/assets/icons/employees.svg' headerText='Employee List' />
      <SideBarButton imgIcon='/assets/icons/employees.svg' headerText='All Referrals' />
      <SideBarButton imgIcon='/assets/icons/employees.svg' headerText='Job Openings' />
      <SideBarButton imgIcon='/assets/icons/employees.svg' headerText='My Referrals' />
    </div>
  );
};

export default Sidebar;
