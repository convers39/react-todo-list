import React, { useContext } from "react";
import { Redirect, Link } from "react-router-dom";
import { firebaseAuth } from "../firebase/config";
import { AuthContext } from "./Auth";

const Login = () => {
	const onSubmit = (e) => {
		e && e.preventDefault();
		const { email, password } = e.target.elements;
		firebaseAuth
			.signInWithEmailAndPassword(email.value, password.value)
			.then((data) => {
				console.log("login page", data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const { isLoggedIn } = useContext(AuthContext);
	if (isLoggedIn) {
		console.log(isLoggedIn);
		return <Redirect to="/" />;
	}
	return (
		<div className="login">
			<div>
				<h3>Log In</h3>
				<form onSubmit={onSubmit}>
					<label htmlFor="email">Email:</label>
					<input id="email" type="email" />
					<label htmlFor="password">Password:</label>
					<input id="password" type="password" />
					<button>Log In</button>
				</form>
				<div>
					<Link to="/register">Sign Up</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
