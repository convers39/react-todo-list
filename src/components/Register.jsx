import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { firebaseAuth } from "../firebase/config";

const Register = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(null);
	const singUp = (e) => {
		e && e.preventDefault();
		const { email, password } = e.target.elements;
		firebaseAuth
			.createUserWithEmailAndPassword(email.value, password.value)
			.then((data) => {
				setIsLoggedIn(true);
				console.log(data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	if (isLoggedIn) {
		return <Redirect to="/" />;
	}

	return (
		<div className="register">
			<h3>Sign Up</h3>
			<form onSubmit={singUp}>
				<label htmlFor="email">Email:</label>
				<input id="email" type="email" />
				<label htmlFor="password">Password:</label>
				<input id="password" type="password" />
				<button>Sign Up</button>
			</form>
		</div>
	);
};

export default Register;
