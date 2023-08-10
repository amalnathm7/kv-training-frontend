import React from "react";
import "./InputField.css";

type InputPropTypes = {
    value: string,
    onChange: (event) => void,
    label: string,
    type: "text" | "password",
    showError: boolean
}

const InputField: React.FC<InputPropTypes> = (props) => {
    return (
        <div className="floating-label-group">
            <input className="field" onChange={props.onChange} type={props.type} value={props.value} required></input>
            <label className="floating-label">{props.label}</label>
            {props.showError && <label className="error">Enter {props.label.toLowerCase()}</label>}
        </div>
    );
};

export default InputField;
