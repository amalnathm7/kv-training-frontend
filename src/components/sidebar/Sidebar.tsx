import React from 'react';
import './Sidebar.css';
import SideBarButton from '../button/SideBarButton/SideBarButton';

const Sidebar: React.FC = () => {
  return (
    <div className='sidebar'>
      {/* <div className='item container'>
        <div className='icon container'>
          <img src='/assets/icons/employees.svg' alt='Icon'></img>
        </div>
        <h3>Employee List</h3>
      </div> */}
      <SideBarButton imgIcon='/assets/icons/employees.svg' headerText='Employee List' />
      <SideBarButton imgIcon='/assets/icons/employees.svg' headerText='All Referrals' />
      <SideBarButton imgIcon='/assets/icons/employees.svg' headerText='Job Openings' />
      <SideBarButton imgIcon='/assets/icons/employees.svg' headerText='My Referrals' />
    </div>
  );
};

export default Sidebar;
