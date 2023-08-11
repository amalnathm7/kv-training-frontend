import React from "react";
import "./PrimaryButton.css";

type ButtonType = {
    type: "button" | "submit"
    label: string,
    height: string,
    onClick: (event) => void
}

const PrimaryButton: React.FC<ButtonType> = (props) => {
    const style = {
        height: props.height
    };

    return <input className="primary-button" style={style} type={props.type} value={props.label} onClick={props.onClick}></input>;
};

export default PrimaryButton;
