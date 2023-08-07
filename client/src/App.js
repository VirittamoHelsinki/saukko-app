// importing all sass styling
import './scss/index.scss';
import axios from 'axios';
import { AuthContextProvider } from './utils/context/AuthContext';
import { DegreeContextProvider } from './utils/context/DegreeContext';
import { CriteriaFieldsContextProvider } from './utils/context/CriteriaFieldsContext';

// importing page routing
import Router from './components/Router/Router';

axios.defaults.withCredentials = true;

// main app
const App = () => {
  return (
    <main className='app__wrapper'>
      <AuthContextProvider>
        <DegreeContextProvider>
          <CriteriaFieldsContextProvider>
            <Router />
          </CriteriaFieldsContextProvider>
        </DegreeContextProvider>
      </AuthContextProvider>
    </main>
  );
};

export default App;
