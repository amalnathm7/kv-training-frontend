import React from "react";
import "./SecondaryButton.css";

export type SecondaryButtonPropsType = {
    type: "button" | "submit"
    label: string,
    style?: React.CSSProperties,
    onClick: (event) => void
}

const SecondaryButton: React.FC<SecondaryButtonPropsType> = (props) => {
    return <input style={props.style} className="secondary-button" type={props.type} value={props.label} onClick={props.onClick} data-testid="secondary-button-test"></input>;
};

export default SecondaryButton;
