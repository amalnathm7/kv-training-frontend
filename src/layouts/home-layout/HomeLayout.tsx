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
  searchClicked?: boolean;
  subHeaderPrimaryActionLabel: string;
  subHeaderPrimaryActionIcon: string;
  subHeaderPrimaryAction: () => void;
  subHeaderSecondaryActionLabel?: string;
  subHeaderSecondaryActionIcon?: string;
  subHeaderSecondaryAction?: () => void;
};

const HomeLayout: React.FC<HomeLayoutPropsType> = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setSelectedTabIndex } = useContext(SelectedContext);

  useEffect(() => {
    if (!localStorage.getItem('token')) navigate(RouteConstants.login, { replace: true });

    if (location.pathname.includes(RouteConstants.employee)) setSelectedTabIndex(0);
    else if (location.pathname.includes(RouteConstants.opening)) setSelectedTabIndex(1);
    else if (location.pathname.includes(RouteConstants.myReferral)) setSelectedTabIndex(2);
    else if (location.pathname.includes(RouteConstants.referral)) setSelectedTabIndex(3);
    else setSelectedTabIndex(0);
  }, []);

  return (
    <div className='home'>
      {props.children}
      <SubHeader
        searchClicked={props.searchClicked}
        label={props.subHeaderLabel}
        primaryAction={props.subHeaderPrimaryAction}
        primaryActionLabel={props.subHeaderPrimaryActionLabel}
        primaryActionIcon={props.subHeaderPrimaryActionIcon}
        secondaryAction={props.subHeaderSecondaryAction}
        secondaryActionLabel={props.subHeaderSecondaryActionLabel}
        secondaryActionIcon={props.subHeaderSecondaryActionIcon}
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
