import React from 'react';
import './LoginField.css';

export type LoginFieldPropsType = {
  value: string;
  onChange: (event) => void;
  label: string;
  type: 'text' | 'password';
  showError: boolean;
};

const LoginField: React.FC<LoginFieldPropsType> = (props) => {
  return (
    <div className='login-floating-label-group'>
      <input
        className='login-field'
        onChange={props.onChange}
        type={props.type}
        value={props.value}
        required
      ></input>
      <label className='login-floating-label'>{props.label}</label>
      {props.showError && <label className='login-error'>Enter {props.label.toLowerCase()}</label>}
    </div>
  );
};

export default LoginField;
