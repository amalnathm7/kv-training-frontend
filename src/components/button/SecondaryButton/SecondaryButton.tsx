import React from "react";
import "./SecondaryButton.css";

type ButtonType = {
    type: "button" | "submit"
    label: string,
    onClick: (event) => void
}

const SecondaryButton: React.FC<ButtonType> = (props) => {
    return <input className="secondary-button" type={props.type} value={props.label} onClick={props.onClick}></input>;
};

export default SecondaryButton;
