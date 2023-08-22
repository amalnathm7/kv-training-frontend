import react, { useEffect } from 'react';
import './SplashPage.css';
import Header from '../../components/header/Header';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from '../../constants/routeConstants';

const SplashPage: react.FC = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      if (token) navigate(`${RouteConstants.employee}`, { replace: true });
      else navigate(`${RouteConstants.login}`, { replace: true });
    }, 1000);
  }, [token]);

  return (
    <div className='splash-body'>
      <Header isSplash={true}></Header>
      <h3 className='splash-heading'>KeyValue</h3>
      <h1 className='splash-main-heading'>Employee Application</h1>
    </div>
  );
};

export default SplashPage;
