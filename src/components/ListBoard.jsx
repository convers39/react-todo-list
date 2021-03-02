import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { Typography } from "@material-ui/core";

import { AuthContext } from "./Auth";
import { fetchLists, moveTodo } from "../actions/todo-action";

import List from "./List";
import NewTodo from "./NewTodo";
import Tags from "./Tags";

const ListBoard = () => {
	const { uid } = useContext(AuthContext);

	const dispatch = useDispatch();
	const lists = useSelector((state) => state);

	useEffect(() => {
		dispatch(fetchLists(uid));
	}, [uid, dispatch]);

	// After drag and drop, update local and remote lists
	const onDragEnd = (result) => {
		dispatch(moveTodo(uid, result));
	};

	// render todo list
	const renderList = (listName, todos) => {
		return <List listName={listName} key={listName} todos={todos} />;
	};

	const style = {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-around",
		backgroundColor: "#eee",
		border: "1px solid #3F51B5",
		height: "100%",
		padding: "2em",
		marginBottom: "3em",
	};

	console.log("lists in board", lists);

	return (
		<div>
			<NewTodo />
			<Tags />
			<div className="list-board" style={style}>
				{Object.keys(lists).length ? (
					<DragDropContext onDragEnd={onDragEnd}>
						{Object.entries(lists).map(
							([listName, list], index) =>
								listName !== "deleted" &&
								renderList(listName, list.todos),
						)}
					</DragDropContext>
				) : (
					<Typography variant="h3" align="center">
						Loading todos...
					</Typography>
				)}
			</div>
		</div>
	);
};

export default ListBoard;
