import { type FC } from 'react';
import './styles/global.css';
import LoginPage from './pages/login/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EmployeeListingPage from './pages/employee/EmployeeListingPage';
import EmployeeDetailsPage from './pages/employee/EmployeeDetailsPage';
import EmployeeCreatePage from './pages/employee/EmployeeCreatePage';
import EmployeeEditPage from './pages/employee/EmployeeEditPage';
import SplashPage from './pages/splash/SplashPage';
import { RouteConstants } from './constants/routeConstants';
import OpeningDetailsPage from './pages/opening/OpeningDetailsPage';
import OpeningListingPage from './pages/opening/OpeningListPage';
import OpeningCreatePage from './pages/opening/OpeningCreatePage';
import OpeningEditPage from './pages/opening/OpeningEditPage';

const App: FC = () => {
  return <div className='app'>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SplashPage />} />
        <Route path={RouteConstants.login} element={<LoginPage />} />
        <Route path={RouteConstants.employee} element={<EmployeeListingPage />} />
        <Route path={`${RouteConstants.employee}/:id`} element={<EmployeeDetailsPage />} />
        <Route path={`${RouteConstants.employee}/create`} element={<EmployeeCreatePage />} />
        <Route path={`${RouteConstants.employee}/:id/edit`} element={<EmployeeEditPage />} />
        <Route path={`${RouteConstants.opening}`} element={<OpeningListingPage />} />
        <Route path={`${RouteConstants.opening}/:id`} element={<OpeningDetailsPage />} />
        <Route path={`${RouteConstants.opening}/create`} element={<OpeningCreatePage />} />
        <Route path={`${RouteConstants.opening}/:id/edit`} element={<OpeningEditPage />} />
      </Routes>
    </BrowserRouter>
  </div>;
};

export default App;
