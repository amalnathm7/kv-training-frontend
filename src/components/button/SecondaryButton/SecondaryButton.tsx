import React from "react";
import "./SecondaryButton.css";

export type SecondaryButtonPropsType = {
    type: "button" | "submit"
    label: string,
    onClick: (event) => void
}

const SecondaryButton: React.FC<SecondaryButtonPropsType> = (props) => {
    return <input className="secondary-button" type={props.type} value={props.label} onClick={props.onClick} data-testid="secondary-button-test"></input>;
};

export default SecondaryButton;
