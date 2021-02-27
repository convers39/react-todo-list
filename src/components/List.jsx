import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Button from "@material-ui/core/Button";

import Todo from "./Todo";

const List = ({ listName, content, addTodo, onDelete }) => {
	const todos = content;

	const renderTodo = (todo, index) => {
		return (
			<Todo
				key={todo.id}
				id={todo.id}
				index={index}
				task={todo.task}
				created={todo.created}
				onDelete={onDelete}
				listName={listName}
				// moveTodo={moveTodo}
			/>
		);
	};

	// sort by latest
	// const sortByCreatedAt = (sorting) => {
	// 	const copy = todos;
	// 	copy.sort((a, b) => {
	// 		return sorting == "ASC"
	// 			? Date.parse(a.created) - Date.parse(b.created)
	// 			: Date.parse(b.created) - Date.parse(a.created);
	// 	});
	// 	setTodos([...copy]);
	// };

	// if (!isLoggedIn) {
	// 	return <Redirect to="/login" />;
	// }

	return (
		<>
			{/*
			<Button
				variant="contained"
				color="primary"
				onClick={() => sortByCreatedAt("DEC")}
			>
				Sort By Latest
			</Button>
			<Button
				variant="contained"
				color="primary"
				onClick={() => sortByCreatedAt("ASC")}
			>
				Sort By CreatedAt
			</Button> */}
			<div className="list-container">
				<h3>{listName}</h3>

				{!!todos.length ? (
					<Droppable droppableId={listName}>
						{(provided, snapshot) => {
							return (
								<div
									ref={provided.innerRef}
									{...provided.droppableProps}
									style={{
										background: snapshot.isDraggingOver
											? "lightblue"
											: "lightgrey",
										padding: 4,
										minHeight: 400,
									}}
								>
									{todos.map((todo, index) =>
										renderTodo(todo, index),
									)}
									{provided.placeholder}
								</div>
							);
						}}
					</Droppable>
				) : (
					<h2>No tasks</h2>
				)}
			</div>
		</>
	);
};

export default List;
