import React from 'react';
import './SideBarButton.css';

export type SideBarButtonPropsType = {
  imgIcon: string;
  headerText: string;
};

const SideBarButton: React.FC<SideBarButtonPropsType> = (props) => {
  return (
    <div className='item container'>
      <div className='icon container'>
        <img src={props.imgIcon} alt='Icon'></img>
      </div>
      <h3>{props.headerText}</h3>
    </div>
  );
};

export default SideBarButton;
