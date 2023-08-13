import React from "react";
import "./FormField.css";

type InputPropTypes = {
    value: string | number | string[],
    onChange: (event) => void,
    label: string,
    placeholder: string,
    type: string,
    showError: boolean,
    disabled: boolean
}

const FormField: React.FC<InputPropTypes> = (props) => {
    return (
        <div className="form-item">
            {props.label.length === 0 && <div className="spacing"></div>}
            <label className="form-label">{props.label}</label>
            <input className="form-field" placeholder={props.placeholder} onChange={props.onChange} type={props.type} value={props.value} disabled={props.disabled}></input>
            {props.showError && <label className="form-error">Enter {props.label.toLowerCase()}</label>}
        </div>
    );
};

export default FormField;
