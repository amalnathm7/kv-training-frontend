import React from "react";
import "./PrimaryButton.css";

type ButtonType = {
    type: "button" | "submit"
    label: string,
    onClick: (event) => void
}

const PrimaryButton: React.FC<ButtonType> = (props) => {
    return <input className="button" type={props.type} value={props.label} onClick={props.onClick}></input>;
};

export default PrimaryButton;
