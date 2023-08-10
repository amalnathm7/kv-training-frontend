import { type FC } from 'react';
import './styles/global.css';
import LoginPage from './pages/login/LoginPage';

const App: FC = () => {
  return <div className='app'>
    <LoginPage></LoginPage>
  </div>;
};

export default App;
