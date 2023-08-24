import React from 'react';
import './ActionButton.css';

export type ActionButtonPropsType = {
  icon: string;
  onClick: () => void;
  isDisabled?: boolean;
};

const ActionButton: React.FC<ActionButtonPropsType> = (props) => (
  <img
    style={props.isDisabled ? { filter: 'grayscale(100%)' } : {}}
    className='action-button-icon'
    src={`/assets/icons/${props.icon}`}
    onClick={(event) => {
      event.stopPropagation();

      if (!props.isDisabled) props.onClick();
    }}
    data-testid='action-button-test'
  ></img>
);

export default ActionButton;
