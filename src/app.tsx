import { type FC } from 'react';
import './styles/global.css';
import LoginPage from './pages/login/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EmployeeListingPage from './pages/employee/EmployeeListingPage';
import EmployeeDetailsPage from './pages/employee/EmployeeDetailsPage';
import EmployeeCreatePage from './pages/employee/EmployeeCreatePage';
import EmployeeEditPage from './pages/employee/EmployeeEditPage';
import SplashPage from './pages/splash/SplashPage';

const App: FC = () => {
  return <div className='app'>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SplashPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/employee' element={<EmployeeListingPage />} />
        <Route path='/employee/:id' element={<EmployeeDetailsPage />} />
        <Route path='/employee/create' element={<EmployeeCreatePage />} />
        <Route path='/employee/:id/edit' element={<EmployeeEditPage />} />
      </Routes>
    </BrowserRouter>
  </div>;
};

export default App;
