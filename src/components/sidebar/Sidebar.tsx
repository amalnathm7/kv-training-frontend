import React, { useContext } from 'react';
import './Sidebar.css';
import SideBarButton from '../button/SideBarButton/SideBarButton';
import { AuthorizationContext, SelectedContext, SelectedContextType } from '../../app';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from '../../constants/routeConstants';

const Sidebar: React.FC = () => {
  const isAuthorized = useContext(AuthorizationContext);
  const { selectedTabIndex, setSelectedTabIndex } =
    useContext<SelectedContextType>(SelectedContext);
  const navigate = useNavigate();

  const onEmployeeListSelected = () => {
    setSelectedTabIndex(0);
    navigate(RouteConstants.employee);
  };

  const onJobOpeningsSelected = () => {
    setSelectedTabIndex(1);
    if (isAuthorized.isSuperAuthorized) navigate(RouteConstants.opening);
    else navigate(RouteConstants.publicOpening);
  };

  const onApplicationsSelected = () => {
    setSelectedTabIndex(2);
    if (isAuthorized.isSuperAuthorized) navigate(RouteConstants.application);
    else if (isAuthorized.isBasicAuthorized) navigate(`${RouteConstants.application}/:id`);
  };

  const onReferralsListSelected = () => {
    setSelectedTabIndex(3);
    navigate(RouteConstants.referral);
  };

  return (
    <div className='sidebar'>
      <div className='sidebar-items'>
        {!isAuthorized.isBasicAuthorized && (
          <SideBarButton
            isSelected={selectedTabIndex === 0}
            onClick={onEmployeeListSelected}
            imgIcon='/assets/icons/employees.png'
            headerText='Employee List'
          />
        )}
        <SideBarButton
          isSelected={selectedTabIndex === 1}
          onClick={onJobOpeningsSelected}
          imgIcon='/assets/icons/opening.png'
          headerText='Job Openings'
        />

        {isAuthorized.isSuperAuthorized && (
          <SideBarButton
            isSelected={selectedTabIndex === 2}
            onClick={onApplicationsSelected}
            imgIcon='/assets/icons/application.png'
            headerText='Applications'
          />
        )}
        {!isAuthorized.isBasicAuthorized && (
          <SideBarButton
            isSelected={selectedTabIndex === 3}
            onClick={onReferralsListSelected}
            imgIcon='/assets/icons/referral.png'
            headerText='Referrals'
          />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
