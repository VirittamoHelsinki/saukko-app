// importing all sass styling
import './scss/index.scss';
import axios from 'axios';
import { AuthContextProvider as OldAuthContextProvider } from './store/context/AuthContext';
import { ExternalApiContextProvider } from './store/context/ExternalApiContext';
import { InternalApiContextProvider } from "./store/context/InternalApiContext";

// importing page routing
import Router from "./components/Router/Router";
import ErrorBoundary from './components/errorBoundary';
import AuthContextProvider from './store/context/authContextProvider';

axios.defaults.withCredentials = true;

// main app
const App = () => {
  return (
    <main className='app__wrapper'>
      <ErrorBoundary>
        <OldAuthContextProvider>
          <AuthContextProvider>
            <InternalApiContextProvider>
              <ExternalApiContextProvider>
                <Router />
              </ExternalApiContextProvider>
            </InternalApiContextProvider>
          </AuthContextProvider>
        </OldAuthContextProvider>
      </ErrorBoundary>
    </main>
  );
};

export default App;
