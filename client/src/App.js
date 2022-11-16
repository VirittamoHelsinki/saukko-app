// importing all sass styling
import "./scss/index.scss";

// importing page routing
import Router from "./components/Router/Router";

// importing footer and header components
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

// main app
const App = () => {
  return (
    <main className="app__wrapper">
      <Header />
      <Router />
      <Footer />
    </main>
  );
};

export default App;
