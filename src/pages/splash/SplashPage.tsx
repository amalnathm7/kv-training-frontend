import react, { useEffect } from 'react';
import './index.css';
import Header from '../../components/header/Header';
import { useNavigate } from 'react-router-dom';

const SplashPage: react.FC = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            if (token)
                navigate('/employee');
            else
                navigate('/login');
        }, 1000);
    }, [token]);

    return <div className='splash-body'>
        <Header isSplash={true}></Header>
        <h3 className='splash-heading'>KeyValue</h3>
        <h1 className='splash-main-heading'>Employee Application</h1>
    </div>;
};

export default SplashPage;
