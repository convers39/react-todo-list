import React, { useState, useCallback } from "react";
import Todo from "./Todo";
import NewTodo from "./NewTodo";

const initial = [
	{
		id: 1,
		task: "todo 1",
		date: "date and time",
		createdAt: "112233",
		userId: 1,
		listId: 1,
	},
	{
		id: 2,
		task: "todo 2",
		date: "date and time",
		createdAt: "new Date()",
		userId: 1,
		listId: 1,
	},
	{
		id: 3,
		task: "todo 3",
		date: "date and time",
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

	const addTask = (task) => {
		const newTodo = {
			id: Math.floor(Math.random() * Math.floor(500)),
			task: task,
			createdAt: "new Date()",
			userId: 1,
			listId: 1,
		};

		setTodos([...todos, newTodo]);
	};

	const moveTodo = useCallback(
		(dragIndex, hoverIndex) => {
			const dragTodo = todos[dragIndex];
			let copy = todos;
			copy.splice(dragIndex, 1);
			copy.splice(hoverIndex, 0, dragTodo);
			setTodos([...copy]);
		},
		[todos],
	);

	const renderTodo = (todo, index) => {
		return (
			<Todo
				key={todo.id}
				id={todo.id}
				index={index}
				task={todo.task}
				createdAt={todo.createdAt}
				onDelete={onDelete}
				moveTodo={moveTodo}
			/>
		);
	};

	return (
		<>
			<NewTodo addTask={addTask} />
			<div className="list-container">
				{!!todos.length ? (
					todos.map((todo, index) => renderTodo(todo, index))
				) : (
					<h2>No tasks</h2>
				)}
			</div>
		</>
	);
};

export default List;
