import React from "react";
import "./PrimaryButton.css";

export type PrimaryButtonPropType = {
    type: "button" | "submit"
    label: string,
    style?: React.CSSProperties,
    onClick: (event) => void
}

const PrimaryButton: React.FC<PrimaryButtonPropType> = (props) => {
    return <input className="primary-button" style={props.style} type={props.type} value={props.label} onClick={props.onClick} data-testid="primary-button-test"></input>;
};

export default PrimaryButton;
