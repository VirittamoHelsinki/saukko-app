// importing all sass styling
import "./scss/index.scss";

// importing page routing
import Router from "./components/Router";

// importing footer and header components
import Header from "./components/Header";
import Footer from "./components/Footer";

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
