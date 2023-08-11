import React from "react";
import "./ActionButton.css";

type ActionButtonProps = {
    icon: string,
    onClick: () => void
};

const ActionButton: React.FC<ActionButtonProps> = (props) => {
    return <img className="action-button-icon" src={`assets/icons/${props.icon}`} onClick={props.onClick}></img>;
};

export default ActionButton;
