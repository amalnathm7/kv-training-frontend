import Sidebar from '../../components/sidebar/Sidebar';
import Header from '../../components/header/Header';
import SubHeader from '../../components/sub-header/SubHeader';
import React, { useContext, useEffect } from 'react';
import './HomeLayout.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { RouteConstants } from '../../constants/routeConstants';
import { SelectedContext } from '../../app';
import { ToastContainer, toast } from 'react-toastify';

type HomeLayoutPropsType = {
  subHeaderLabel: string;
  subHeaderPrimaryActionLabel: string;
  subHeaderPrimaryActionIcon: string;
  subHeaderPrimaryActionValue?: string;
  subHeaderPrimaryActionPlaceholder?: string;
  subHeaderPrimaryActionFilterOptions?: string[];
  subHeaderPrimaryAction: (e) => void;
  subHeaderSecondaryActionLabel?: string;
  subHeaderSecondaryActionIcon?: string;
  subHeaderSecondaryActionPlaceholder?: string;
  subHeaderSecondaryAction?: (e) => void;
  subHeaderRouteOptions?: string[];
  subHeaderOnRouteChanged?: (event) => void;
};

const HomeLayout: React.FC<HomeLayoutPropsType> = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setSelectedTabIndex, isMyReferralsSelected } = useContext(SelectedContext);

  useEffect(() => {
    if (
      !localStorage.getItem('token') &&
      !window.location.pathname.includes(`${RouteConstants.opening}`)
    )
      // navigate(RouteConstants.login, { replace: true });
      navigate(-1);

    if (location.pathname.includes(RouteConstants.employee)) setSelectedTabIndex(0);
    else if (location.pathname.includes(RouteConstants.opening)) setSelectedTabIndex(1);
    else if (location.pathname.includes(RouteConstants.application)) setSelectedTabIndex(2);
    else if (location.pathname.includes(RouteConstants.referral)) setSelectedTabIndex(3);
    else setSelectedTabIndex(0);
  }, []);

  useEffect(() => {
    if (
      location.pathname === RouteConstants.referral ||
      location.pathname === RouteConstants.myReferral
    )
      if (isMyReferralsSelected) navigate(RouteConstants.myReferral);
      else navigate(RouteConstants.referral);
  }, [isMyReferralsSelected]);

  return (
    <div className='home'>
      {props.children}
      <SubHeader
        routeOptions={props.subHeaderRouteOptions}
        onRouteChanged={props.subHeaderOnRouteChanged}
        label={props.subHeaderLabel}
        primaryAction={props.subHeaderPrimaryAction}
        primaryActionLabel={props.subHeaderPrimaryActionLabel}
        primaryActionIcon={props.subHeaderPrimaryActionIcon}
        primaryActionValue={props.subHeaderPrimaryActionValue}
        primaryActionPlaceholder={props.subHeaderPrimaryActionPlaceholder}
        primaryActionFilterOptions={props.subHeaderPrimaryActionFilterOptions}
        secondaryAction={props.subHeaderSecondaryAction}
        secondaryActionLabel={props.subHeaderSecondaryActionLabel}
        secondaryActionIcon={props.subHeaderSecondaryActionIcon}
        secondaryActionPlaceholder={props.subHeaderSecondaryActionPlaceholder}
      />
      <Sidebar />
      <Header />
      <ToastContainer
        position={toast.POSITION.BOTTOM_CENTER}
        autoClose={1500}
        hideProgressBar={true}
      />
    </div>
  );
};

export default HomeLayout;
