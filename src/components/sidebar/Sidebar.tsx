import React, { useContext } from 'react';
import './Sidebar.css';
import SideBarButton from '../button/SideBarButton/SideBarButton';
import { SelectedContext, SelectedContextType } from '../../app';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from '../../constants/routeConstants';

const Sidebar: React.FC = () => {
  const { selectedTabIndex, setSelectedTabIndex } =
    useContext<SelectedContextType>(SelectedContext);
  const navigate = useNavigate();

  const onEmployeeListSelected = () => {
    setSelectedTabIndex(0);
    navigate(RouteConstants.employee);
  };

  const onJobOpeningsSelected = () => {
    setSelectedTabIndex(1);
    navigate(RouteConstants.opening);
  };

  const onMyReferralsSelected = () => {
    setSelectedTabIndex(2);
    navigate(RouteConstants.myReferral);
  };

  const onReferralsListSelected = () => {
    setSelectedTabIndex(3);
    navigate(RouteConstants.referral);
  };

  return (
    <div className='sidebar'>
      <div className='sidebar-items'>
        <SideBarButton
          isSelected={selectedTabIndex === 0}
          onClick={onEmployeeListSelected}
          imgIcon='/assets/icons/employees.png'
          headerText='Employee List'
        />
        <SideBarButton
          isSelected={selectedTabIndex === 1}
          onClick={onJobOpeningsSelected}
          imgIcon='/assets/icons/job_icon.png'
          headerText='Job Openings'
        />
        <SideBarButton
          isSelected={selectedTabIndex === 2}
          onClick={onMyReferralsSelected}
          imgIcon='/assets/icons/my_referrals.png'
          headerText='My Referrals'
        />
        <SideBarButton
          isSelected={selectedTabIndex === 3}
          onClick={onReferralsListSelected}
          imgIcon='/assets/icons/all_referrals.png'
          headerText='All Referrals'
        />
      </div>
    </div>
  );
};

export default Sidebar;
