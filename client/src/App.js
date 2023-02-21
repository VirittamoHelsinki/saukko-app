// importing all sass styling
import "./scss/index.scss";
import axios from "axios";
import { AuthContextProvider } from "./components/context/AuthContext";

// importing page routing
import Router from "./components/Router/Router";
/*import Router from "./Router";*/
axios.defaults.withCredentials = true;

// main app
const App = () => {
  return (
    <main className="app__wrapper">
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </main>
  );
};

export default App;
