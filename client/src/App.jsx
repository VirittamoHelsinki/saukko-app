// importing all sass styling
import './scss/index.scss';
import axios from 'axios';
import { ExternalApiContextProvider } from './store/context/ExternalApiContext';
import { InternalApiContextProvider } from "./store/context/InternalApiContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// importing page routing
import Router from "./components/Router/Router";
import { ErrorBoundary } from './components/errorBoundary';
import RouterGuard from './components/Router/RouteGuard';
import AuthContextProvider from './store/context/authContextProvider';
import HeadingContextProvider from './store/context/headingContectProvider';
import { EvaluationsProvider } from './store/context/EvaluationsContext';

axios.defaults.withCredentials = true;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

// main app
const App = () => {
  return (
    <div className='app__wrapper'>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            <HeadingContextProvider>
              <InternalApiContextProvider>
                <ExternalApiContextProvider>
                  <EvaluationsProvider>
                    <RouterGuard>
                      <Router />
                    </RouterGuard>
                  </EvaluationsProvider>
                </ExternalApiContextProvider>
              </InternalApiContextProvider>
            </HeadingContextProvider>
          </AuthContextProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </div>
  );
};

export default App
