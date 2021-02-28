import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import "./App.scss";
import ListBoard from "./components/ListBoard";
import Header from "./components/Header";
import Register from "./components/Register";
import Login from "./components/Login";

import { AuthProvider } from "./components/Auth";

function App() {
	return (
		<div className="App">
			<CssBaseline />
			<Container maxWidth="md">
				{/* <Typography
					component="div"
					style={{ backgroundColor: "#cfe8fc", height: "100vh" }}
				/> */}
				<AuthProvider>
					<Router>
						<Header />
						<Switch>
							<Route exact path="/" component={ListBoard} />
							<Route exact path="/login" component={Login} />
							<Route
								exact
								path="/register"
								component={Register}
							/>
						</Switch>
					</Router>
				</AuthProvider>
			</Container>
		</div>
	);
}

export default App;
