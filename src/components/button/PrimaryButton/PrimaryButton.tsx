import React from "react";
import "./PrimaryButton.css";

export type PrimaryButtonPropType = {
    type: "button" | "submit"
    label: string,
    height?: string,
    onClick: (event) => void
}

const PrimaryButton: React.FC<PrimaryButtonPropType> = (props) => {
    const style = {
        height: props.height ? props.height : "35px"
    };

    return <input className="primary-button" style={style} type={props.type} value={props.label} onClick={props.onClick} data-testid="primary-button-test"></input>;
};

export default PrimaryButton;
