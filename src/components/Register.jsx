import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { firebaseAuth } from "../firebase/config";

const Register = () => {
	const [currentUser, setCurrentUser] = useState(null);
	const singUp = (e) => {
		e && e.preventDefault();
		const { email, password } = e.target.elements;
		console.log(email.value, password.value);
		firebaseAuth
			.createUserWithEmailAndPassword(email.value, password.value)
			.then((data) => {
				setCurrentUser(true);
				console.log(data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	if (currentUser) {
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
