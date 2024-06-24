// importing necessary packages for routing
import {
  Routes,
  Route,
  useLocation,
  useNavigate
} from 'react-router-dom';
import React, { useContext, useEffect, Suspense } from 'react';

// importing state management
import InternalApiContext from '../../store/context/InternalApiContext';
import { useAuthContext } from '../../store/context/authContextProvider';
import TestEnvWarning from '../debugging/testEnvWarning';
import PageLayout from '../PageLayout/pageLayout';

// importing all pages which need routing, using lazy, only resources that client needs are loaded ⚡
const TestPage = React.lazy(() => import('../../pages/TestPage/TestPage'));
const LandingPage = React.lazy(() => import('../../pages/LandingPage/LandingPage'));
const LoginPage = React.lazy(() => import('../../pages/LoginPage/LoginPage'));
const ForgotPassword = React.lazy(() => import('../../pages/ForgotPassword/ForgotPassword'));
const AddDegree = React.lazy(() => import('../../pages/AdminDegree/AddDegree/AddDegree'));
const SearchPage = React.lazy(() => import('../../pages/AdminDegree/SearchPage/SearchPage'));
const DegreeInfo = React.lazy(() => import('../../pages/AdminDegree/DegreeInfo/DegreeInfo'));
const DegreeUnits = React.lazy(() => import('../../pages/AdminDegree/DegreeUnits/DegreeUnits'));
const EditUnits = React.lazy(() => import('../../pages/AdminDegree/EditUnits/EditUnits'));
const SpecifyTasks = React.lazy(() => import('../../pages/AdminDegree/SpecifyTasks/SpecifyTasks'));
const Summary = React.lazy(() => import('../../pages/AdminDegree/Summary/Summary'));
const ProfilePage = React.lazy(() => import('../../pages/ProfilePage/ProfilePage'));
const ResetPassword = React.lazy(() => import('../../pages/ResetPassword/ResetPassword'));
const UnitList = React.lazy(() => import('../../pages/Home/UnitList/UnitList'));
const CustomerList = React.lazy(() => import('../../pages/Home/CustomerList/CustomerList'));
const ContractInfo = React.lazy(() => import('../../pages/ContractInfo/ContractInfo'));
const CompanyInfo = React.lazy(() => import('../../pages/CompanyInfo/CompanyInfo'));
const AdminMenu = React.lazy(() => import('../../pages/AdminMenu/AdminMenu'));
const EvaluationForm = React.lazy(() => import('../../pages/CreateEvaluation/EvaluationForm/EvaluationForm'));
const EvaluationWorkplace = React.lazy(() => import('../../pages/CreateEvaluation/EvaluationWorkplace/EvaluationWorkplace'));
const EvaluationUnits = React.lazy(() => import('../../pages/CreateEvaluation/EvaluationUnits/EvaluationUnits'));
const EvaluationSummary = React.lazy(() => import('../../pages/CreateEvaluation/EvaluationSummary/EvaluationSummary'));
const CompanySearchPage = React.lazy(() => import('../../pages/CompanyInfo/CompanySearchPage/CompanySearchPage'));
const CompanyDegreeUnits = React.lazy(() => import('../../pages/CompanyInfo/CompanyDegreeUnits/CompanyDegreeUnits'));
const DegreeConfirmSelection = React.lazy(() => import('../../pages/CompanyInfo/DegreeConfirmSelection/DegreeConfirmSelection'));
const UserPerformance = React.lazy(() => import('../../pages/Performance/UserPerformance/UserPerformance'));
const AddCompanyName = React.lazy(() => import('../../pages/AddCompanyName/AddCompanyName'));
const EmailVerification = React.lazy(() => import('../../pages/VerifyEmail/VerifyEmail'));
const CreateUnitsSummary = React.lazy(() => import('../../pages/CreateSummary/CreateUnitsSummary'));
const SetPassword = React.lazy(() => import('../../pages/setPassword/SetPassword'));
const RegisterUser = React.lazy(() => import('../../pages/RegisterUser/RegisterUser'));
const CompanySummary = React.lazy(() => import('../../pages/CompanyInfo/CompanySummary/CompanySummary'));

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
        navigate(`/unit-list/${currentUser.id}`);
      }
    }
  }, [currentUser, loggedIn, navigate, path]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  return (
    <>
      <TestEnvWarning />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes key={location.pathname} location={location}>
          <Route path='/' element={<PageLayout />}>
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
                <Route path='/unit-list/:customerId' element={<UnitList />} />
                <Route path='/contract-info/:customerId' element={<ContractInfo />} />
                <Route path='/userperformance/:unitId' element={<UserPerformance />} />
                <Route path='/register-user' element={<RegisterUser />} />
              </>
            )}

            {/* <Route path='/DO_NOT_LEAVE_THAT_HERE' element={<PageLayout><div>Content</div></PageLayout>} /> */}

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
                <Route path='/add/companyname' element={<AddCompanyName />} />
                <Route path='/add/companyname/:companyId' element={<CompanySummary />} />
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
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default Router;
