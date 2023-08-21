import Sidebar from '../../components/sidebar/Sidebar';
import Header from '../../components/header/Header';
import SubHeader from '../../components/sub-header/SubHeader';
import React, { useEffect } from 'react';
import './HomeLayout.css';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from '../../constants/routeConstants';

type HomeLayoutPropsType = {
  subHeaderLabel: string;
  subHeaderPrimaryActionLabel: string;
  subHeaderPrimaryActionIcon: string;
  subHeaderPrimaryAction: () => void;
  subHeaderSecondaryActionLabel?: string;
  subHeaderSecondaryActionIcon?: string;
  subHeaderSecondaryAction?: () => void;
  searchClicked?: boolean;
};

const HomeLayout: React.FC<HomeLayoutPropsType> = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) navigate(RouteConstants.login, { replace: true });
  }, []);

  return (
    <div className='home'>
      {props.children}
      <SubHeader
        primaryAction={props.subHeaderPrimaryAction}
        label={props.subHeaderLabel}
        primaryActionLabel={props.subHeaderPrimaryActionLabel}
        primaryActionIcon={props.subHeaderPrimaryActionIcon}
        searchClicked={props.searchClicked}
      />
      <Sidebar />
      <Header />
    </div>
  );
};

export default HomeLayout;
