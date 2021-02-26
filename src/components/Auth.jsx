import React, { createContext, useState, useEffect } from "react";
import { firebaseAuth } from "../firebase/config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(false);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		firebaseAuth.onAuthStateChanged((user) => {
			if (user) {
				console.log(user);
				setCurrentUser(true);
				setLoading(false);
			}
		});
	}, []);

	// if (loading) {
	// 	return <h2>Loading...</h2>;
	// }

	return (
		<div>
			<AuthContext.Provider value={{ currentUser }}>
				{children}
			</AuthContext.Provider>
		</div>
	);
};
