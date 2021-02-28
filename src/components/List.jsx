import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Typography } from "@material-ui/core";

import Todo from "./Todo";
import Sorting from "./Sorting";

const List = ({ listName, content, sort, onDelete }) => {
	const todos = content;

	const renderTodo = (todo, index) => {
		return (
			<Todo
				key={todo.id}
				id={todo.id}
				index={index}
				task={todo.task}
				date={todo.date}
				created={todo.created}
				onDelete={onDelete}
				listName={listName}
				// moveTodo={moveTodo}
			/>
		);
	};

	const style = {
		padding: "1em",
		backgroundColor: "lightgrey",
		borderRadius: "5px",
		margin: "1em 0",
		width: "400px",
	};

	return (
		<div style={style}>
			<Typography variant="h5" align="center">
				@{listName}
			</Typography>
			<Sorting sort={sort} listName={listName} />
			<div className="list-container">
				{
					<Droppable droppableId={listName}>
						{!!todos.length ? (
							(provided, snapshot) => {
								return (
									<div
										ref={provided.innerRef}
										{...provided.droppableProps}
										style={{
											background: snapshot.isDraggingOver
												? "#6a80aa"
												: "#50658d",
											padding: ".5em",
											borderRadius: "5px",
											// minHeight: 400,
										}}
									>
										{todos.map((todo, index) =>
											renderTodo(todo, index),
										)}
										{provided.placeholder}
									</div>
								);
							}
						) : (
							<h2>No todos</h2>
						)}
					</Droppable>
				}
			</div>
		</div>
	);
};

export default List;
