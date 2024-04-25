// importing all sass styling
import './scss/index.scss';
import axios from 'axios';
import { ExternalApiContextProvider } from './store/context/ExternalApiContext';
import { InternalApiContextProvider } from "./store/context/InternalApiContext";

// importing page routing
import Router from "./components/Router/Router";
import { ErrorBoundary } from './components/errorBoundary';
import AuthContextProvider from './store/context/authContextProvider';
import HeadingContextProvider from './store/context/headingContectProvider';

axios.defaults.withCredentials = true;

// main app
const App = () => {
  return (
    <div className='app__wrapper'>
      <ErrorBoundary>
        <AuthContextProvider>
          <HeadingContextProvider>
            <InternalApiContextProvider>
              <ExternalApiContextProvider>
                <Router />
              </ExternalApiContextProvider>
            </InternalApiContextProvider>
          </HeadingContextProvider>
        </AuthContextProvider>
      </ErrorBoundary>
    </div>
  );
};

export default App
