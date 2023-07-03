import { useEffect } from 'react';

// importing necessary packages for routing
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';

// importing all pages which need routing
import TestPage from '../../pages/TestPage/TestPage';
import LandingPage from '../../pages/LandingPage/LandingPage';
import ChooseRole from '../../pages/ChooseRole/ChooseRole';
import LoginPage from '../../pages/LoginPage/LoginPage';
import LoginInfo from '../../pages/CreateAccountCustomer/LoginInfo/LoginInfo';
import GeneralInfo from '../../pages/CreateAccountCustomer/GeneralInfo/GeneralInfo';
import WorkInfo from '../../pages/CreateAccountCustomer/WorkInfo/WorkInfo';
import AccountCreated from '../../pages/CreateAccountCustomer/AccountCreated/AccountCreated';
import AccountFailed from '../../pages/CreateAccountCustomer/AccountFailed/AccountFailed';
import RegisterSupervisor from '../../pages/CreateAccountSupervisor/RegisterSupervisor';
import RegisterTeacher from '../../pages/CreateAccountTeacher/RegisterTeacher';
import NotificationSupervisor from '../../pages/CreateAccountSupervisor/NotificationSupervisor';
import NotificationTeacher from '../../pages/CreateAccountTeacher/NotificationTeacher';
import RegisterPage from '../../pages/RegisterPage/RegisterPage';
import UserPage from '../../pages/UserPage/UserPage';
import ForgotPassword from '../../pages/ForgotPassword/ForgotPassword';
import FirstLogin from '../../pages/FirstLogin/FirstLogin';
import SearchPage from '../../pages/ChooseDegree/SearchPage/SearchPage';
import DegreeInfo from '../../pages/ChooseDegree/DegreeInfo/DegreeInfo';
import DegreeUnits from '../../pages/ChooseDegree/DegreeUnits/DegreeUnits';
import UnitInfo from '../../pages/ChooseDegree/UnitInfo/UnitInfo';
import ConfirmSelection from '../../pages/ChooseDegree/ConfirmSelection/ConfirmSelection';
import ProfilePage from '../../pages/ProfilePage/ProfilePage';
import AuthContext from '../../utils/context/AuthContext';
import HomePageAfterLoggedIn from '../../pages/HomePageAfterLoggedIn/HomePageAfterLoggedIn';
import ResetPassword from '../../pages/ResetPassword/ResetPassword';
import UserDashboard from '../../pages/UserDashboard/UserDashboard';
import ContractInfo from '../../pages/ContractInfo/ContractInfo';
import UpdateHomePageAfterLoggedIn from '../../pages/UpdateHomePageAfterLogin/UpdateHomepageAfterLogin';
import UpdateHomePageAfterLogin from '../../pages/UpdateHomePageAfterLogin/UpdateHomepageAfterLogin';



const Router = () => {
  let location = useLocation();
  const { loggedIn } = useContext(AuthContext);

  const path = location.path;
  const navigate = useNavigate();

  useEffect(() => {
    if (
      loggedIn &&
      (path === '/' ||
        path === '/login' ||
        path === '/register-customer' ||
        path === '/forgot-password')
    ) {
      navigate('/userdashboard');
    }
  }, [loggedIn, path, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  return (
    <>
      <Routes key={location.pathname} location={location}>
        {/* placeholder paths and pages */}

        <Route path='/test-page' element={<TestPage />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/first-login' element={<FirstLogin />} />
        <Route path='/reset-password/:token' element={<ResetPassword />} />
        <Route path='/logged-user' element={<HomePageAfterLoggedIn />} />
        <Route path='/update-logged-user' element={<UpdateHomePageAfterLogin />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/contract-info' element={<ContractInfo />} />
        <Route path='/degrees' element={<SearchPage />} />
        <Route path='/degrees/:degreeId' element={<DegreeInfo />} />
        <Route path='/degrees/:degreeId/units' element={<DegreeUnits />} />
        <Route path='/degrees/:degreeId/units/:unitId' element={<UnitInfo />} />
        <Route path='/degrees/:degreeId/units/confirm-selection' element={<ConfirmSelection />} />

        {!loggedIn && (
          <>
            <Route exact='true' path='/' element={<LandingPage />} />
            <Route path='/choose-role' element={<ChooseRole />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register-customer' element={<RegisterPage />} />
            <Route path='/login-info' element={<LoginInfo />} />
            <Route path='/general-info' element={<GeneralInfo />} />
            <Route path='/work-info' element={<WorkInfo />} />
            <Route path='/account-failed' element={<AccountFailed />} />
            <Route path='/reset-password/:token' element={<ResetPassword />} />

            <Route
              path='/register-supervisor'
              element={<RegisterSupervisor />}
            />
            <Route path='/register-teacher' element={<RegisterTeacher />} />
            <Route
              path='/form-supervisor-sent'
              element={<NotificationSupervisor />}
            />
            <Route
              path='/form-teacher-sent'
              element={<NotificationTeacher />}
            />
          </>
        )}
        {loggedIn && (
          <>
            <Route path='/home' element={<UserPage />} />
            <Route path='/first-login' element={<FirstLogin />} />
            <Route path='/search' element={<SearchPage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/logged-user' element={<HomePageAfterLoggedIn />} />
            <Route path='/account-created' element={<AccountCreated />} />
            <Route path='/userdashboard' element={<UserDashboard />} />
            <Route path='/contract-info' element={<ContractInfo />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default Router;
