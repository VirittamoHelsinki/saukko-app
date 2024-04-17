// importing necessary packages for routing
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';

// importing state management
import InternalApiContext from '../../store/context/InternalApiContext';

// importing all pages which need routing
import TestPage from '../../pages/TestPage/TestPage';
import LandingPage from '../../pages/LandingPage/LandingPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import ForgotPassword from '../../pages/ForgotPassword/ForgotPassword';
import AddDegree from '../../pages/AdminDegree/AddDegree/AddDegree';
import SearchPage from '../../pages/AdminDegree/SearchPage/SearchPage';
import DegreeInfo from '../../pages/AdminDegree/DegreeInfo/DegreeInfo';
import DegreeUnits from '../../pages/AdminDegree/DegreeUnits/DegreeUnits';
import EditUnits from '../../pages/AdminDegree/EditUnits/EditUnits';
import SpecifyTasks from '../../pages/AdminDegree/SpecifyTasks/SpecifyTasks';
import Summary from '../../pages/AdminDegree/Summary/Summary';
import ProfilePage from '../../pages/ProfilePage/ProfilePage';
import ResetPassword from '../../pages/ResetPassword/ResetPassword';
import UnitList from '../../pages/Home/UnitList/UnitList';
import CustomerList from '../../pages/Home/CustomerList/CustomerList';
import ContractInfo from '../../pages/ContractInfo/ContractInfo';
import CompanyInfo from '../../pages/CompanyInfo/CompanyInfo';
import AdminMenu from '../../pages/AdminMenu/AdminMenu';
import EvaluationForm from '../../pages/CreateEvaluation/EvaluationForm/EvaluationForm';
import EvaluationWorkplace from '../../pages/CreateEvaluation/EvaluationWorkplace/EvaluationWorkplace';
import EvaluationUnits from '../../pages/CreateEvaluation/EvaluationUnits/EvaluationUnits';
import EvaluationSummary from '../../pages/CreateEvaluation/EvaluationSummary/EvaluationSummary';
import CompanySearchPage from '../../pages/CompanyInfo/CompanySearchPage/CompanySearchPage';
import CompanyDegreeUnits from '../../pages/CompanyInfo/CompanyDegreeUnits/CompanyDegreeUnits';
import DegreeConfirmSelection from '../../pages/CompanyInfo/DegreeConfirmSelection/DegreeConfirmSelection';
import UserPerformance from '../../pages/Performance/UserPerformance/UserPerformance';
import AddCompanyName from '../../pages/AddCompanyName/AddCompanyName';
import EmailVerification from '../../pages/VerifyEmail/VerifyEmail';
import CreateUnitsSummary from '../../pages/CreateSummary/CreateUnitsSummary';
import SetPassword from '../../pages/setPassword/SetPassword';
import ErrorBoundary from '../errorBoundary';
import { useAuthContext } from '../../store/context/authContextProvider';

const Router = () => {
  let location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  // const { loggedIn, user } = useContext(AuthContext);
  const { loggedIn, currentUser } = useAuthContext();

  // Used only for console.log at the moment.
  const { allInternalDegrees } = useContext(InternalApiContext);

  // Redirect to home page from login pages when already logged in
  useEffect(() => {
    if (loggedIn && (path === '/' || path === '/login' || path === '/forgot-password')) {
      if (currentUser.role === 'teacher' || currentUser.role === 'supervisor') {
        navigate('/');
      } else if (currentUser.role === 'customer') {
        navigate('/unit-list');
      }
    }
  }, [currentUser, loggedIn, navigate, path]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  return (
    <ErrorBoundary>
      <Routes key={location.pathname} location={location}>

        {/* Placeholders for development */}
        <Route path='/test-page' element={<TestPage />} />
        <Route path="/verify-email/:token" element={<EmailVerification />} />
        {/* Not logged in */}
        {!loggedIn && (
          <>
            <Route exact='true' path='/' element={<LandingPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/reset-password/:token' element={<ResetPassword />} />
            <Route path='/set-password' element={<SetPassword />} />
          </>
        )}

        {/* All logged in users */}
        {loggedIn && (
          <>
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/unit-list' element={<UnitList />} />
            <Route path='/contract-info' element={<ContractInfo />} />
            <Route path='/userperformance' element={<UserPerformance />} />
          </>
        )}

        {/* Teacher or supervisor */}
        {loggedIn && (currentUser.role === 'teacher' || currentUser.role === 'supervisor') && (
          <Route path='/' element={<CustomerList />} />
        )}

        {/* Teacher only */}
        {loggedIn && currentUser.role === 'teacher' && (
          <>
            <Route path='/admin-menu' element={<AdminMenu />} />

            {/* Degree flow */}
            <Route path='/degrees/add' element={<AddDegree />} />
            <Route path='/degrees/add/:degreeId' element={<CreateUnitsSummary allInternalDegrees={allInternalDegrees} />} />
            <Route path='/degrees' element={<SearchPage />} />
            <Route path='/degrees/:degreeId' element={<DegreeInfo />} />
            <Route path='/degrees/:degreeId/units' element={<DegreeUnits />} />
            <Route path='/degrees/:degreeId/edit-units' element={<EditUnits />} />
            <Route path='/degrees/:degreeId/units/tasks' element={<SpecifyTasks />} />
            <Route path='/degrees/:degreeId/summary' element={<Summary />} />

            {/* Workplace flow */}
            <Route path='/add/companyname' element={<AddCompanyName></AddCompanyName>} />
            <Route path='/company-info' element={<CompanyInfo />} />
            <Route path='/internal/degrees' element={<CompanySearchPage />} />
            <Route path='internal/degrees/:degreeId/units' element={<CompanyDegreeUnits />} />
            <Route path='internal/degrees/:degreeId/units/confirm-selection' element={<DegreeConfirmSelection />} />

            {/* Evaluation flow */}
            <Route path='/evaluation-form' element={<EvaluationForm />} />
            <Route path='/evaluation-workplace' element={<EvaluationWorkplace />} />
            <Route path='/evaluation-units' element={<EvaluationUnits />} />
            <Route path='/evaluation-summary' element={<EvaluationSummary />} />

            {/* Units flow */}
            <Route path='/create-units-summary' element={<CreateUnitsSummary />} />
          </>
        )}
      </Routes>
    </ErrorBoundary>
  );
};

export default Router;
