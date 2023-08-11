import React from "react";
import "./DropDown.css";

type DropDownPropType = {
    value: string,
    onChange: (event) => void,
    label: string,
    placeholder: string,
    type: string,
    showError: boolean
    options: string[]
};


const DropDown: React.FC<DropDownPropType> = (props) => {
    const options = props.options.map((option) =>
        <option key={option} value={option}>{option}</option>);

    return <div className="dropdown-item">
        <label className="dropdown-label">{props.label}</label>
        <select onChange={props.onChange} className="dropdown-field" value={props.value}>
            <option selected disabled>{props.placeholder}</option>
            {options}
        </select>
        {props.showError && <label className="dropdown-error">Enter {props.label.toLowerCase()}</label>}
    </div>;
};

export default DropDown;
