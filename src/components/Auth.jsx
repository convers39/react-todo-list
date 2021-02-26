import React, { createContext, useState, useEffect } from "react";
import { firebaseAuth } from "../firebase/config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [uid, setUid] = useState(null);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		firebaseAuth.onAuthStateChanged((user) => {
			if (user) {
				console.log(user.uid);
				setUid(user.uid);
				setIsLoggedIn(true);
				setLoading(false);
			}
		});
	}, []);

	// if (loading) {
	// 	return <h2>Loading...</h2>;
	// }

	return (
		<div>
			<AuthContext.Provider value={{ isLoggedIn, uid }}>
				{children}
			</AuthContext.Provider>
		</div>
	);
};
