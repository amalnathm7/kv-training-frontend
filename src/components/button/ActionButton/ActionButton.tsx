import React, { CSSProperties } from 'react';
import './ActionButton.css';

export type ActionButtonPropsType = {
  icon: string;
  onClick: () => void;
  style?: CSSProperties;
};

const ActionButton: React.FC<ActionButtonPropsType> = (props) => (
  <img
    style={props.style}
    className='action-button-icon'
    src={`/assets/icons/${props.icon}`}
    onClick={(event) => {
      event.stopPropagation();
      props.onClick();
    }}
    data-testid='action-button-test'
  ></img>
);

export default ActionButton;
