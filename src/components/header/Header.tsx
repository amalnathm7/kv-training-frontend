import React, { useEffect, useState } from 'react';
import './Header.css';
import SecondaryButton from '../button/SecondaryButton/SecondaryButton';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from '../../constants/routeConstants';
import { useDispatch } from 'react-redux';
import { baseApi } from '../../services/baseApi';
import { useGetMyProfileQuery } from '../../services/employeeApi';

export type HeaderPropsType = {
  isSplash?: boolean;
};

const Header: React.FC<HeaderPropsType> = (props) => {
  const style = {
    width: props.isSplash ? '100%' : '300px'
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isError: isMyProfileFetchError } = useGetMyProfileQuery();
  const [isBasicAuthorized, setIsBasicAuthorized] = useState(false);

  useEffect(() => {
    if (isMyProfileFetchError) setIsBasicAuthorized(true);
  }, [isMyProfileFetchError]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(baseApi.util.resetApiState());
    navigate(RouteConstants.login, { replace: true });
  };

  return (
    <div className='header'>
      <div className='img-bg' style={style}>
        <img className='header-logo' src='/assets/img/kv-logo.png' alt='KeyValue Logo'></img>
      </div>
      {!props.isSplash && (
        <div className='header-logout-button'>
          {!isBasicAuthorized && (
            <SecondaryButton label='Log out' type={'button'} onClick={handleLogout} />
          )}
          {isBasicAuthorized && (
            <SecondaryButton label='Exit' type={'button'} onClick={handleLogout} />
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
