// importing all sass styling
import "./scss/index.scss";

// importing page routing
import Router from "./components/Router/Router";

// main app
const App = () => {
	return (
		<main className="app__wrapper">
			<Router />
		</main>
	);
};

export default App;
