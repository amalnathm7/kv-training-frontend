import React from "react";
import "./PrimaryButton.css";

export type PrimaryButtonPropsType = {
    type: "button" | "submit"
    label: string,
    style?: React.CSSProperties,
    onClick: (event) => void
}

const PrimaryButton: React.FC<PrimaryButtonPropsType> = (props) => {
    return <input className="primary-button" style={props.style} type={props.type} value={props.label} onClick={props.onClick} data-testid="primary-button-test"></input>;
};

export default PrimaryButton;
