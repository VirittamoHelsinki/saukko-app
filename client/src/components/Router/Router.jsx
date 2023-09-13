import { useEffect } from 'react';

// importing necessary packages for routing
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';

// importing all pages which need routing
import TestPage from '../../pages/TestPage/TestPage';
import LandingPage from '../../pages/LandingPage/LandingPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import ForgotPassword from '../../pages/ForgotPassword/ForgotPassword';
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
import AdminMenu from '../../pages/AdminMenu/AdminMenu';
import EvaluationForm from '../../pages/CreateEvaluation/EvaluationForm/EvaluationForm';
import EvaluationWorkplace from '../../pages/CreateEvaluation/EvaluationWorkplace/EvaluationWorkplace';
import EvaluationUnits from '../../pages/CreateEvaluation/EvaluationUnits/EvaluationUnits';
import EvaluationSummary from '../../pages/CreateEvaluation/EvaluationSummary/EvaluationSummary';
import CompanySearchPage from '../../pages/CompanyInfo/CompanySearchPage/CompanySearchPage';
import CompanyDegreeUnits from '../../pages/CompanyInfo/CompanyDegreeUnits/CompanyDegreeUnits';
import DegreeConfirmSelection from '../../pages/CompanyInfo/DegreeConfirmSelection/DegreeConfirmSelection';

const Router = () => {
  let location = useLocation();
  const { loggedIn, user } = useContext(AuthContext);

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
        <Route path='/company-info' element={<CompanyInfo />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
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
            <Route path='/login' element={<LoginPage />} />
            <Route path='/reset-password/:token' element={<ResetPassword />} />
          </>
        )}
        
        {loggedIn && (
          <>
            <Route path='/search' element={<SearchPage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/logged-user' element={<HomePageAfterLoggedIn />} />
            <Route path='/userdashboard' element={<UserDashboard />} />
            <Route path='/contract-info' element={<ContractInfo />} />
            <Route path='/internal/degrees' element={<CompanySearchPage />} />
            <Route path='internal/degrees/:degreeId/units' element={<CompanyDegreeUnits />} />
            <Route path='internal/degrees/:degreeId/units/confirm-selection' element={<DegreeConfirmSelection />} />
          </>
        )}

        {loggedIn && user.role === 'teacher' && (
          <Route path='/admin-menu' element={<AdminMenu />} />
        )}
      </Routes>
    </>
  );
};

export default Router;
