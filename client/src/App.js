// importing all sass styling
import "./scss/index.scss";
import axios from "axios";
import { AuthContextProvider } from "./utils/context/AuthContext";
import { DegreeContextProvider } from "./utils/context/DegreeContext";

// importing page routing
import Router from "./components/Router/Router";
import { InternalDegreeContextProvider } from "./utils/context/InternalDegreeContext";

axios.defaults.withCredentials = true;

// main app
const App = () => {
  return (
    <main className="app__wrapper">
      <AuthContextProvider>
       <InternalDegreeContextProvider>
       <DegreeContextProvider>
          <Router />
        </DegreeContextProvider>
       </InternalDegreeContextProvider>
      </AuthContextProvider>
    </main>
  );
};

export default App;
