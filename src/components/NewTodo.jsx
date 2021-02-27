import React, { useState } from "react";

const NewTodo = ({ addTodo }) => {
	const [task, setTask] = useState("");
	const [listName, setListName] = useState("");

	const onTask = (e) => {
		setTask(e.target.value);
	};

	const onList = (e) => {
		setListName(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (!task || !listName) {
			alert("task and list name are required");
			return;
		}
		addTodo(task, listName);
	};

	return (
		<div className="new-task">
			<form className="new-task__form" onSubmit={onSubmit}>
				<label htmlFor="new-task__content">New Todo: </label>
				<input
					id="new-task__content"
					className="new-task__content"
					type="text"
					onChange={onTask}
					value={task}
				/>
				<label htmlFor="new-task__list-name">Add to list: </label>
				<input
					id="new-task__list-name"
					className="new-task__list-name"
					type="text"
					onChange={onList}
					value={listName}
				/>
				<button className="new-task__btn">Add</button>
			</form>
		</div>
	);
};

export default NewTodo;
