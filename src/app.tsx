import { useState, FC, Dispatch, SetStateAction, Context, createContext } from 'react';
import './styles/global.css';
import LoginPage from './pages/login/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EmployeeListingPage from './pages/employee/EmployeeListingPage';
import EmployeeDetailsPage from './pages/employee/EmployeeDetailsPage';
import EmployeeCreatePage from './pages/employee/EmployeeCreatePage';
import EmployeeEditPage from './pages/employee/EmployeeEditPage';
import SplashPage from './pages/splash/SplashPage';
import { RouteConstants } from './constants/routeConstants';
import AllReferralsListingPage from './pages/referral/AllReferralsListingPage';
import OpeningDetailsPage from './pages/opening/OpeningDetailsPage';
import ReferralCreatePage from './pages/referral/ReferralCreatePage';
import OpeningListingPage from './pages/opening/OpeningListingPage';
import OpeningCreatePage from './pages/opening/OpeningCreatePage';
import OpeningEditPage from './pages/opening/OpeningEditPage';
import ReferralEditPage from './pages/referral/ReferralEditPage';
import MyReferralsListingPage from './pages/referral/MyReferralsListingPage';
import ReferralDetailsPage from './pages/referral/ReferralDetailsPage';
import ApplicationListingPage from './pages/application/ApplicationListingPage';
import ApplicationDetailsPage from './pages/application/ApplicationDetailsPage';
import ApplicationCreatePage from './pages/application/ApplicationCreatePage';
import ApplicationEditPage from './pages/application/ApplicationEditPage';
import { EmployeeType } from './types/EmployeeType';
import { Tooltip } from 'react-tooltip';

export type SelectedContextType = {
  selectedTabIndex: number;
  setSelectedTabIndex: Dispatch<SetStateAction<number>>;
  isMyReferralsSelected: boolean;
  setIsMyReferralsSelected: Dispatch<SetStateAction<boolean>>;
  myProfile: EmployeeType;
  setMyProfile: Dispatch<SetStateAction<EmployeeType>>;
};
export type AuthorizationContextType = {
  isSuperAuthorized: boolean;
  isAdvanceAuthorized: boolean;
  isBasicAuthorized: boolean;
  setIsSuperAuthorized: Dispatch<SetStateAction<boolean>>;
  setIsAdvanceAuthorized: Dispatch<SetStateAction<boolean>>;
  setIBasicAuthorized: Dispatch<SetStateAction<boolean>>;
};

export const SelectedContext: Context<SelectedContextType> = createContext(null);
export const AuthorizationContext: Context<AuthorizationContextType> = createContext(null);

const App: FC = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(-1);
  const [isMyReferralsSelected, setIsMyReferralsSelected] = useState(false);
  const [myProfile, setMyProfile] = useState<EmployeeType>();
  const [isSuperAuthorized, setIsSuperAuthorized] = useState(false);
  const [isAdvanceAuthorized, setIsAdvanceAuthorized] = useState(false);
  const [isBasicAuthorized, setIBasicAuthorized] = useState(true);

  return (
    <div className='app'>
      <SelectedContext.Provider
        value={{
          selectedTabIndex,
          setSelectedTabIndex,
          isMyReferralsSelected,
          setIsMyReferralsSelected,
          myProfile,
          setMyProfile
        }}
      >
        <AuthorizationContext.Provider
          value={{
            isSuperAuthorized,
            isAdvanceAuthorized,
            isBasicAuthorized,
            setIBasicAuthorized,
            setIsSuperAuthorized,
            setIsAdvanceAuthorized
          }}
        >
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
              <Route
                path={`${RouteConstants.opening}/:id/refer`}
                element={<ReferralCreatePage />}
              />
              <Route path={`${RouteConstants.referral}/:id/edit`} element={<ReferralEditPage />} />
              <Route
                path={`${RouteConstants.myReferral}/:id/edit`}
                element={<ReferralEditPage />}
              />
              <Route path={`${RouteConstants.opening}/create`} element={<OpeningCreatePage />} />
              <Route path={`${RouteConstants.opening}/:id/edit`} element={<OpeningEditPage />} />
              <Route path={`${RouteConstants.referral}`} element={<AllReferralsListingPage />} />
              <Route path={`${RouteConstants.myReferral}`} element={<MyReferralsListingPage />} />
              <Route path={`${RouteConstants.referral}/:id`} element={<ReferralDetailsPage />} />
              <Route path={`${RouteConstants.myReferral}/:id`} element={<ReferralDetailsPage />} />
              <Route path={`${RouteConstants.application}`} element={<ApplicationListingPage />} />
              <Route
                path={`${RouteConstants.opening}/:id/apply`}
                element={<ApplicationCreatePage />}
              />
              <Route
                path={`${RouteConstants.application}/:id/edit`}
                element={<ApplicationEditPage />}
              />
              <Route
                path={`${RouteConstants.application}/:id`}
                element={<ApplicationDetailsPage />}
              />
              <Route
                path={`${RouteConstants.referral}/opening/:id`}
                element={<MyReferralsListingPage />}
              />
              <Route
                path={`${RouteConstants.application}/opening/:id`}
                element={<ApplicationListingPage />}
              />
            </Routes>
          </BrowserRouter>
        </AuthorizationContext.Provider>
      </SelectedContext.Provider>
      <Tooltip id='tooltip id' />
    </div>
  );
};

export default App;
