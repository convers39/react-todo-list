import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { firebaseAuth } from "../firebase/config";
import { AuthContext } from "./Auth";

const Login = () => {
	const onSubmit = (e) => {
		e && e.preventDefault();
		const { email, password } = e.target.elements;
		console.log(email.value, password.value);
		firebaseAuth
			.signInWithEmailAndPassword(email.value, password.value)
			.then((data) => {
				console.log(data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const { currentUser } = useContext(AuthContext);
	if (currentUser) {
		console.log(currentUser);
		// return <Redirect to="/" />;
	}
	return (
		<div className="login">
			{currentUser ? (
				<div>
					<button onClick={() => firebaseAuth.signOut()}>
						Sign Out
					</button>
				</div>
			) : (
				<div>
					<h3>Log In</h3>
					<form onSubmit={onSubmit}></form>
					<label htmlFor="email">Email:</label>
					<input id="email" type="email" />
					<label htmlFor="password">Password:</label>
					<input id="password" type="password" />
					<button>Log In</button>
				</div>
			)}
		</div>
	);
};

export default Login;
