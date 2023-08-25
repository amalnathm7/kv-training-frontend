import React from 'react';
import './SideBarButton.css';

export type SideBarButtonPropsType = {
  imgIcon: string;
  headerText: string;
  isSelected: boolean;
  onClick: () => void;
};

const SideBarButton: React.FC<SideBarButtonPropsType> = (props) => {
  return (
    <div
      onClick={props.onClick}
      className={props.isSelected ? 'item container selected' : 'item container'}
      data-testid='sidebar-button-test'
    >
      <div className={props.isSelected ? 'icon container selected' : 'icon container'}>
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
