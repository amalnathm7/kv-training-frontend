import React from "react";
import "./ActionButton.css";

export type ActionButtonPropsType = {
    icon: string,
    onClick: () => void
};

const ActionButton: React.FC<ActionButtonPropsType> = (props) => {
    return <img className="action-button-icon" src={`assets/icons/${props.icon}`} onClick={(event) => {
        event.stopPropagation();
        props.onClick();
    }} data-testid="action-button-test"></img>;
};

export default ActionButton;
