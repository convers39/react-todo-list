import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { firebaseAuth } from "../firebase/config";
import { AuthContext } from "./Auth";
import { Button } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

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
		<header className="header">
			{/* <div>Logo</div>
			<div>
				<h1>Todo List</h1>
			</div> */}
			<AppBar position="static">
				<Toolbar
					style={{ display: "flex", justifyContent: "space-between" }}
				>
					<IconButton edge="start" color="inherit" aria-label="menu">
						<MenuIcon />
					</IconButton>
					<Typography variant="h6">Todo List</Typography>
					<div>
						{isLoggedIn ? (
							<Button
								// variant="outlined"
								component={RouterLink}
								to="/login"
								onClick={() => firebaseAuth.signOut()}
							>
								<ExitToAppIcon style={{ color: "white" }} />
							</Button>
						) : (
							<p></p>
						)}
					</div>
				</Toolbar>
			</AppBar>
		</header>
	);
};

export default Header;
