// importing all sass styling
import './scss/index.scss';
import axios from 'axios';
import { AuthContextProvider } from './store/context/AuthContext';
import { ExternalApiContextProvider } from './store/context/ExternalApiContext';
import { InternalApiContextProvider } from "./store/context/InternalApiContext";

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
              <Router />
            </ExternalApiContextProvider>
        </InternalApiContextProvider>
      </AuthContextProvider>
    </main>
  );
};

export default App;
