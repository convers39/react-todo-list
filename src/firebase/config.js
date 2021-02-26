import firebase from "firebase/app";

import "firebase/auth";
import "firebase/database";

const config = {
	apiKey: "AIzaSyDpDb7o-Q-uDEQySSAJT7Z73UuTYQru8I4",
	authDomain: "react-todo-list-convers39.firebaseapp.com",
	databaseURL:
		"https://react-todo-list-convers39-default-rtdb.firebaseio.com",
	projectId: "react-todo-list-convers39",
	storageBucket: "react-todo-list-convers39.appspot.com",
	messagingSenderId: "1074759395522",
	appId: "1:1074759395522:web:be116262ec8e53024c735b",
};
firebase.initializeApp(config);

const firebaseAuth = firebase.auth();
const db = firebase.database();

export { firebaseAuth, db, config };
