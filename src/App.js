import "./App.scss";
import List from "./components/List";
import Header from "./components/Header";
import Register from "./components/Register";
import Login from "./components/Login";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { AuthProvider } from "./components/Auth";

function App() {
	return (
		<div className="App">
			<AuthProvider>
				<Router>
					<Header />
					<Switch>
						<Route exact path="/" component={List} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/register" component={Register} />
					</Switch>
				</Router>
			</AuthProvider>
		</div>
	);
}

export default App;
