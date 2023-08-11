import { type FC } from 'react';
import './styles/global.css';
import LoginPage from './pages/login/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EmployeeListingPage from './pages/employee/EmployeeListingPage';
import EmployeeDetailsPage from './pages/employee/EmployeeDetailsPage';
import EmployeeCreatePage from './pages/employee/EmployeeCreatePage';

const App: FC = () => {
  return <div className='app'>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/employee' element={<EmployeeListingPage />} />
        <Route path='/employee/:id' element={<EmployeeDetailsPage />} />
        <Route path='/employee/create' element={<EmployeeCreatePage />} />
      </Routes>
    </BrowserRouter>
  </div>;
};

export default App;
