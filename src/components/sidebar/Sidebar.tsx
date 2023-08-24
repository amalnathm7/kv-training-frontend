import React, { useContext } from 'react';
import './Sidebar.css';
import SideBarButton from '../button/SideBarButton/SideBarButton';
import { AuthorizationContext, SelectedContext, SelectedContextType } from '../../app';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from '../../constants/routeConstants';

const Sidebar: React.FC = () => {
  const authorizationContext = useContext(AuthorizationContext);
  const { selectedTabIndex, setSelectedTabIndex, setIsMyReferralsSelected } =
    useContext<SelectedContextType>(SelectedContext);
  const navigate = useNavigate();

  const onEmployeeListSelected = () => {
    setSelectedTabIndex(0);
    navigate(RouteConstants.employee);
  };

  const onJobOpeningsSelected = () => {
    setSelectedTabIndex(1);
    if (authorizationContext.isBasicAuthorized) navigate(RouteConstants.publicOpening);
    else navigate(RouteConstants.opening);
  };

  const onApplicationsSelected = () => {
    setSelectedTabIndex(2);
    navigate(RouteConstants.application);
  };

  const onReferralsListSelected = () => {
    setSelectedTabIndex(3);
    setIsMyReferralsSelected(false);
    navigate(RouteConstants.referral);
  };

  return (
    <div className='sidebar'>
      <div className='sidebar-items'>
        {!authorizationContext.isBasicAuthorized && (
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

        {authorizationContext.isSuperAuthorized && (
          <SideBarButton
            isSelected={selectedTabIndex === 2}
            onClick={onApplicationsSelected}
            imgIcon='/assets/icons/application.png'
            headerText='Applications'
          />
        )}
        {!authorizationContext.isBasicAuthorized && (
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
