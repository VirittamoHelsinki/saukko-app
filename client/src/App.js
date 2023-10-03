// importing all sass styling
import './scss/index.scss';
import axios from 'axios';
import { AuthContextProvider } from './store/context/AuthContext';
import { ExternalApiContextProvider } from './store/context/ExternalApiContext';
import { InternalApiContextProvider } from "./store/context/InternalApiContext";
import { CriteriaFieldsContextProvider } from './store/context/CriteriaFieldsContext';

// importing page routing
import Router from "./components/Router/Router";

axios.defaults.withCredentials = true;

// main app
const App = () => {
  return (
    <main className='app__wrapper'>
      <AuthContextProvider>
       <InternalApiContextProvider>
        <ExternalApiContextProvider>
          <CriteriaFieldsContextProvider>
            <Router />
          </CriteriaFieldsContextProvider>
        </ExternalApiContextProvider>
       </InternalApiContextProvider>
      </AuthContextProvider>
    </main>
  );
};

export default App;
