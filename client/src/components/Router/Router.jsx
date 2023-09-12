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
import SpecifyTasks from '../../pages/ChooseDegree/SpecifyTasks/SpecifyTasks';
import Summary from '../../pages/ChooseDegree/Summary/Summary';
import ProfilePage from '../../pages/ProfilePage/ProfilePage';
import AuthContext from '../../utils/context/AuthContext';
import HomePageAfterLoggedIn from '../../pages/HomePageAfterLoggedIn/HomePageAfterLoggedIn';
import ResetPassword from '../../pages/ResetPassword/ResetPassword';
import UserDashboard from '../../pages/UserDashboard/UserDashboard';
import ContractInfo from '../../pages/ContractInfo/ContractInfo';
import UpdateHomePageAfterLoggedIn from '../../pages/UpdateHomePageAfterLogin/UpdateHomepageAfterLogin';
import UpdateHomePageAfterLogin from '../../pages/UpdateHomePageAfterLogin/UpdateHomepageAfterLogin';
import CompanyInfo from '../../pages/CompanyInfo/CompanyInfo';

import EvaluationForm from '../../pages/CreateEvaluation/EvaluationForm/EvaluationForm';
import EvaluationWorkplace from '../../pages/CreateEvaluation/EvaluationWorkplace/EvaluationWorkplace';
import EvaluationUnits from '../../pages/CreateEvaluation/EvaluationUnits/EvaluationUnits';
import EvaluationSummary from '../../pages/CreateEvaluation/EvaluationSummary/EvaluationSummary';
import CompanySearchPage from '../../pages/CompanyInfo/CompanySearchPage/CompanySearchPage';
import CompanyDegreeUnits from '../../pages/CompanyInfo/CompanyDegreeUnits/CompanyDegreeUnits';
import DegreeConfirmSelection from '../../pages/CompanyInfo/DegreeConfirmSelection/DegreeConfirmSelection';

import { fetchAllDegrees } from '../../api/degree';
import { fetchAllWorkplaces } from '../../api/workplace';

import useStore from '../../store/useStore';

const Router = () => {
  let location = useLocation();
  const { loggedIn } = useContext(AuthContext);

  const path = location.path;
  const navigate = useNavigate();

  const {
    degrees,
    workplaces,
    setDegrees,
    setWorkplaces
  } = useStore();

  // Load data from the backend if the user has logged in.
  useEffect(() => {
    if (loggedIn) {
      fetchAllDegrees()
      .then(data => setDegrees(data))
      .catch(err => console.log(err));

      fetchAllWorkplaces()
      .then(data => setWorkplaces(data))
      .catch(err => console.log(err));
    }
  }, [loggedIn]);

  // Update the component after the data in the store has been updated
  // with data from the backend.
  useEffect(() => {
    console.log('Internal degrees: ', degrees);
    console.log('Internal workplaces: ', workplaces);
  }, [degrees, workplaces]);

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
        <Route path='/company-info' element={<CompanyInfo />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/first-login' element={<FirstLogin />} />
        <Route path='/reset-password/:token' element={<ResetPassword />} />
        <Route path='/logged-user' element={<HomePageAfterLoggedIn />} />
        <Route
          path='/update-logged-user'
          element={<UpdateHomePageAfterLogin />}
        />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/contract-info' element={<ContractInfo />} />
        <Route path='/degrees' element={<SearchPage />} />
        <Route path='/degrees/:degreeId' element={<DegreeInfo />} />
        <Route path='/degrees/:degreeId/units' element={<DegreeUnits />} />
        <Route path='/degrees/:degreeId/units/:unitId' element={<UnitInfo />} />
        <Route
          path='/degrees/:degreeId/units/confirm-selection'
          element={<ConfirmSelection />}
        />
        <Route
          path='/degrees/:degreeId/units/tasks'
          element={<SpecifyTasks />}
        />
        <Route path='/degrees/:degreeId/summary' element={<Summary />} />

        <Route path='/evaluation-form' element={<EvaluationForm />} />
        <Route path='/evaluation-workplace' element={<EvaluationWorkplace />} />
        <Route path='/evaluation-units' element={<EvaluationUnits />} />
        <Route path='/evaluation-summary' element={<EvaluationSummary />} />
        <Route path='/internal/degrees' element={<CompanySearchPage />} />
        <Route path='internal/degrees/:degreeId/units' element={<CompanyDegreeUnits />} />
        <Route path='internal/degrees/:degreeId/units/confirm-selection' element={<DegreeConfirmSelection />} />

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
            <Route path='/internal/degrees' element={<CompanySearchPage />} />
            <Route path='internal/degrees/:degreeId/units' element={<CompanyDegreeUnits />} />
            <Route path='internal/degrees/:degreeId/units/confirm-selection' element={<DegreeConfirmSelection />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default Router;
