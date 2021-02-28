import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { firebaseAuth } from "../firebase/config";
import { AuthContext } from "./Auth";
import { Button } from "@material-ui/core";

const Header = () => {
	const { isLoggedIn } = useContext(AuthContext);

	const style = {
		backgroundColor: "lightcoral",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		padding: "0 20px",
	};

	return (
		<header className="header" style={style}>
			<div>Logo</div>
			<div>
				<h1>Todo List</h1>
			</div>
			<div>
				{isLoggedIn ? (
					<Button onClick={() => firebaseAuth.signOut()}>
						Log Out
					</Button>
				) : (
					<Button component={RouterLink} to="/login">
						Log In
					</Button>
				)}
			</div>
		</header>
	);
};

export default Header;
