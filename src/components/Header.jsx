import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { firebaseAuth } from "../firebase/config";
import { AuthContext } from "./Auth";

const Header = () => {
	const { isLoggedIn } = useContext(AuthContext);
	if (!isLoggedIn) {
		return <Redirect to="/login" />;
	}
	return (
		<header className="header">
			<div>Todo List Shit</div>
			{isLoggedIn && (
				<button onClick={() => firebaseAuth.signOut()}>Sign Out</button>
			)}
		</header>
	);
};

export default Header;
