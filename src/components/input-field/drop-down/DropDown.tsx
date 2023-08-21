import React from 'react';
import './DropDown.css';

export type DropDownPropsType = {
  value: string;
  onChange: (event) => void;
  label: string;
  placeholder: string;
  showError: boolean;
  options: string[];
};

const DropDown: React.FC<DropDownPropsType> = (props) => {
  const options = props.options.map((option) => (
    <option key={option} value={option}>
      {option}
    </option>
  ));

  return (
    <div className='dropdown-item'>
      <label className='dropdown-label'>{props.label}</label>
      <select
        onChange={props.onChange}
        className='dropdown-field'
        value={props.value}
        data-testid='drop-down-test'
      >
        <option hidden>{props.value}</option>
        {options}
      </select>
      {props.showError && (
        <label className='dropdown-error'>Enter {props.label.toLowerCase()}</label>
      )}
    </div>
  );
};

export default DropDown;
