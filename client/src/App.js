// importing all sass styling
import './scss/index.scss';
import axios from 'axios';
import { AuthContextProvider } from './utils/context/AuthContext';
import { DegreeContextProvider } from './utils/context/DegreeContext';
import { CriteriaFieldsContextProvider } from './utils/context/CriteriaFieldsContext';

// importing page routing
import Router from "./components/Router/Router";
import { InternalDegreeContextProvider } from "./utils/context/InternalDegreeContext";

// importing ApiLoader
import ApiLoader from "./components/ApiLoader";

axios.defaults.withCredentials = true;

// main app
const App = () => {
  return (
    <main className='app__wrapper'>
      <AuthContextProvider>
       <InternalDegreeContextProvider>
        <DegreeContextProvider>
          <CriteriaFieldsContextProvider>
            <ApiLoader />
            <Router />
          </CriteriaFieldsContextProvider>
        </DegreeContextProvider>
       </InternalDegreeContextProvider>
      </AuthContextProvider>
    </main>
  );
};

export default App;
