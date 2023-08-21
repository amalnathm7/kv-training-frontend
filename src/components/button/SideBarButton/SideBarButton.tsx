import React from 'react';
import './SideBarButton.css';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from '../../../constants/routeConstants';

export type SideBarButtonPropsType = {
  imgIcon: string;
  headerText: string;
  route: RouteConstants;
};

const SideBarButton: React.FC<SideBarButtonPropsType> = (props) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(props.route);
  };

  return (
    <div onClick={onClick} className='item container'>
      <div className='icon container'>
        <img
          className='filtered'
          style={{ height: '15px', width: '15px' }}
          src={props.imgIcon}
          alt='Icon'
        ></img>
      </div>
      <h3>{props.headerText}</h3>
    </div>
  );
};

export default SideBarButton;
