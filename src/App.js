import "./App.scss";
import List from "./components/List";
import Header from "./components/Header";
import Register from "./components/Register";
import Login from "./components/Login";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { AuthContext, AuthProvider } from "./components/Auth";
import React, { useContext } from "react";

function App() {
	// const { currentUser } = useContext(AuthContext);
	return (
		<div className="App">
			<AuthProvider>
				<Router>
					<DndProvider backend={HTML5Backend}>
						<Header />
						<List />
					</DndProvider>
					<Login />
					<Register />
					{/* {currentUser ? <Login /> : <Register />} */}
				</Router>
			</AuthProvider>
		</div>
	);
}

export default App;
