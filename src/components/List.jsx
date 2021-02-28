import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Button from "@material-ui/core/Button";

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
		// margin: "20px 10px",
	};

	return (
		<div style={style}>
			<h3 style={{ textAlign: "center" }}>{listName}</h3>
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
												? "lightblue"
												: "#25d4dd",
											padding: 4,
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
