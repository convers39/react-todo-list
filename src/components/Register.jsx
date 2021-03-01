import React, { useContext } from "react";
import { Redirect, Link as RouterLink } from "react-router-dom";
import {
	TextField,
	Card,
	CardContent,
	CardActions,
	CardHeader,
	Button,
} from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import { firebaseAuth } from "../firebase/config";
import { AuthContext } from "./Auth";

const useStyles = makeStyles((theme) =>
	createStyles({
		container: {
			display: "flex",
			flexWrap: "wrap",
			width: 400,
			margin: `${theme.spacing(0)} auto`,
		},
		loginBtn: {
			marginTop: theme.spacing(2),
			flexGrow: 1,
		},
		header: {
			textAlign: "center",
			background: "#3F51B5",
			color: "#fff",
		},
		card: {
			marginTop: theme.spacing(10),
		},
		actions: {
			display: "block",
			textAlign: "center",
			marginBottom: theme.spacing(2),
		},
	}),
);

const Register = () => {
	const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
	const classes = useStyles();
	const signUp = (e) => {
		e && e.preventDefault();
		const { email, password } = e.target.elements;
		firebaseAuth
			.createUserWithEmailAndPassword(email.value, password.value)
			.then((data) => {
				setIsLoggedIn(true);
				console.log(data);
			})
			.catch(console.error);
	};

	if (isLoggedIn) {
		return <Redirect to="/" />;
	}

	return (
		<div className="login">
			<form
				className={classes.container}
				noValidate
				autoComplete="off"
				onSubmit={signUp}
			>
				<Card className={classes.card}>
					<CardHeader className={classes.header} title="Sign Up" />
					<CardContent>
						<TextField
							// error={state.isError}
							fullWidth
							id="email"
							type="email"
							label="Email"
							placeholder="Email"
							margin="normal"
						/>
						<TextField
							// error={state.isError}
							fullWidth
							id="password"
							type="password"
							label="Password"
							placeholder="Password"
							margin="normal"
							// helperText={state.helperText}
						/>
					</CardContent>
					<CardActions className={classes.actions}>
						<Button
							variant="contained"
							size="large"
							color="primary"
							type="submit"
							// disabled={state.isButtonDisabled}
						>
							Sign up
						</Button>
						<Button
							variant="outlined"
							size="large"
							color="primary "
							component={RouterLink}
							to="/login"
							// disabled={state.isButtonDisabled}
						>
							Login
						</Button>
					</CardActions>
				</Card>
			</form>
		</div>
	);
};

export default Register;
