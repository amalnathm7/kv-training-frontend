import React, { useContext, useEffect, useState } from 'react';
import './Sidebar.css';
import SideBarButton from '../button/SideBarButton/SideBarButton';
import { SelectedContext, SelectedContextType } from '../../app';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from '../../constants/routeConstants';
import { useGetMyProfileQuery } from '../../services/employeeApi';
import { PermissionLevel } from '../../utils/PermissionLevel';

const Sidebar: React.FC = () => {
  const { data: myProfile, isSuccess: isMyProfileFetchSuccess } = useGetMyProfileQuery();
  const [isSuperAuthorized, setIsSuperAuthorized] = useState(false);
  const { selectedTabIndex, setSelectedTabIndex } =
    useContext<SelectedContextType>(SelectedContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      isMyProfileFetchSuccess &&
      myProfile.data.role &&
      myProfile.data.role.permissionLevel === PermissionLevel.SUPER
    )
      setIsSuperAuthorized(true);
  }, [isMyProfileFetchSuccess]);

  const onEmployeeListSelected = () => {
    setSelectedTabIndex(0);
    navigate(RouteConstants.employee);
  };

  const onJobOpeningsSelected = () => {
    setSelectedTabIndex(1);
    navigate(RouteConstants.opening);
  };

  const onApplicationsSelected = () => {
    setSelectedTabIndex(2);
    navigate(RouteConstants.application);
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
          imgIcon='/assets/icons/opening.png'
          headerText='Job Openings'
        />
        {isSuperAuthorized && (
          <SideBarButton
            isSelected={selectedTabIndex === 2}
            onClick={onApplicationsSelected}
            imgIcon='/assets/icons/application.png'
            headerText='Applications'
          />
        )}
        <SideBarButton
          isSelected={selectedTabIndex === 3}
          onClick={onReferralsListSelected}
          imgIcon='/assets/icons/referral.png'
          headerText='Referrals'
        />
      </div>
    </div>
  );
};

export default Sidebar;
