import React from "react";
import "./FormField.css";

export type FormFieldPropsType = {
    value: string | number | string[],
    onChange: (event) => void,
    label: string,
    placeholder: string,
    type: string,
    showError: boolean,
    disabled: boolean
}

const FormField: React.FC<FormFieldPropsType> = (props) => {
    return (
        <div className="form-item">
            {props.label.length === 0 && <div className="spacing"></div>}
            <label className="form-label">{props.label}</label>
            <input className="form-field" placeholder={props.placeholder} onChange={props.onChange} type={props.type} value={props.value} disabled={props.disabled}></input>
            {props.showError && <label className="form-error">Enter {props.label.trim().length !== 0 ? props.label.toLowerCase() : props.placeholder.toLowerCase()}</label>}
        </div>
    );
};

export default FormField;
