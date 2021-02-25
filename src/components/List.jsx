import React, { useState } from "react";
import Todo from "./Todo";
import NewTodo from "./NewTodo";

const initial = [
	{
		id: 1,
		text: "todo 1",
		createdAt: "112233",
		userId: 1,
		listId: 1,
	},
	{
		id: 2,
		text: "todo 2",
		createdAt: "new Date()",
		userId: 1,
		listId: 1,
	},
	{
		id: 3,
		text: "todo 3",
		createdAt: "new Date()",
		userId: 1,
		listId: 1,
	},
];

const List = () => {
	const [todos, setTodos] = useState(initial);

	const onDelete = (id) => {
		setTodos(todos.filter((todo) => todo.id !== id));
	};

	const onAdd = (text) => {
		const newTodo = {
			id: Math.floor(Math.random() * Math.floor(500)),
			text: text,
			createdAt: "new Date()",
			userId: 1,
			listId: 1,
		};

		setTodos([...todos, newTodo]);
	};

	return (
		<>
			<NewTodo onAdd={onAdd} />
			<div className="list-container">
				{!!todos.length &&
					todos.map((todo) => (
						<Todo
							key={todo.id}
							id={todo.id}
							text={todo.text}
							createdAt={todo.createdAt}
							onDelete={onDelete}
						/>
					))}
			</div>
		</>
	);
};

export default List;
