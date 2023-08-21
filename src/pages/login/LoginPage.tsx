import PrimaryButton from '../../components/button/PrimaryButton/PrimaryButton';
import React, { useEffect, useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import LoginField from '../../components/input-field/login-field/LoginField';
import { useLoginMutation } from '../../services/loginApi';
import { RouteConstants } from '../../constants/routeConstants';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  const changeEmail = (event) => {
    setEmailError(false);
    setEmail(event.target.value);
  };

  const changePassword = (event) => {
    setPasswordError(false);
    setPassword(event.target.value);
  };

  const [login, { data, isSuccess, isError, error }] = useLoginMutation();

  const onClick = () => {
    if (email.trim().length === 0) setEmailError(true);
    if (password.trim().length === 0) setPasswordError(true);
    if (email.trim().length > 0 && password.trim().length > 0)
      login({
        email,
        password
      });
  };

  useEffect(() => {
    if (isSuccess && data) {
      localStorage.setItem('token', data.data.token);
      navigate(RouteConstants.employee, { replace: true });
    }
  }, [data, isSuccess, isError]);

  useEffect(() => {
    if (localStorage.getItem('token')) navigate(RouteConstants.employee, { replace: true });
  });

  return (
    <div className='login-container'>
      <div className='split left'>
        <div className='circle'>
          <img className='placeholder' src='assets/img/banner.png' alt='Login Placeholder'></img>
        </div>
      </div>
      <div className='split right'>
        <div className='login-form-container'>
          <img className='login-logo' src='assets/img/kv-logo.png' alt='KeyValue Logo'></img>
          <LoginField
            label='Email'
            onChange={changeEmail}
            showError={emailError}
            value={email}
            type='text'
          />
          <LoginField
            label='Password'
            onChange={changePassword}
            showError={passwordError}
            value={password}
            type='password'
          />
          <PrimaryButton
            style={{ height: '50px', marginBottom: '0px' }}
            type='submit'
            label='Log in'
            onClick={onClick}
          />
          {isError && (
            <div className='login-error'>
              <p>{error['data'].errors.error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
