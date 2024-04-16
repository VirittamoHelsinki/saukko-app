// importing all sass styling
import './scss/index.scss';
import axios from 'axios';
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
        <AuthContextProvider>
          <InternalApiContextProvider>
            <ExternalApiContextProvider>
              <Router />
            </ExternalApiContextProvider>
          </InternalApiContextProvider>
        </AuthContextProvider>
      </ErrorBoundary>
    </main>
  );
};

export default App
