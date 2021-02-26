import React, { useState, useCallback, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { AuthContext } from "./Auth";
import { db } from "../firebase/config";
import Todo from "./Todo";
import NewTodo from "./NewTodo";

const List = () => {
	const [todos, setTodos] = useState([]);
	const { isLoggedIn, uid } = useContext(AuthContext);
	useEffect(() => {
		db.ref(`all_lists/${uid}/coding`).on("value", (snapshot) => {
			let allTodos = [];
			snapshot.forEach((snap) => {
				allTodos.push(snap.val());
			});
			console.log(allTodos);
			setTodos([...allTodos]);
		});
		// return () => {
		// 	cleanup;
		// };
	}, []);

	const onDelete = (todoId) => {
		db.ref(`all_lists/${uid}/coding/${todoId}`)
			.remove()
			.then((res) => {
				console.log("removed", res);
			})
			.catch(console.error);
		setTodos(todos.filter((todo) => todo.id !== todoId));
	};

	const addTask = (task) => {
		const newTodo = {
			id: `todo_${Date.now()}`,
			task: task,
			created: new Date().toLocaleDateString(),
			date: new Date().toLocaleDateString(),
		};
		//
		db.ref(`all_lists/${uid}/coding/${newTodo.id}`)
			.push({
				...newTodo,
			})
			.then(() => {
				setTodos([newTodo, ...todos]);
			})
			.catch(console.error);
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
				created={todo.created}
				onDelete={onDelete}
				moveTodo={moveTodo}
			/>
		);
	};

	// sort by latest
	const sortByCreatedAt = (sorting) => {
		const copy = todos;
		copy.sort((a, b) => {
			return sorting == "ASC"
				? Date.parse(a.created) - Date.parse(b.created)
				: Date.parse(b.created) - Date.parse(a.created);
		});
		setTodos([...copy]);
	};

	if (!isLoggedIn) {
		return <Redirect to="/login" />;
	}

	return (
		<>
			<NewTodo addTask={addTask} />
			<button onClick={() => sortByCreatedAt("DEC")}>
				Sort By Latest
			</button>
			<button onClick={() => sortByCreatedAt("ASC")}>
				Sort By CreatedAt
			</button>
			<DndProvider backend={HTML5Backend}>
				<div className="list-container">
					{!!todos.length ? (
						todos.map((todo, index) => renderTodo(todo, index))
					) : (
						<h2>No tasks</h2>
					)}
				</div>
			</DndProvider>
		</>
	);
};

export default List;
