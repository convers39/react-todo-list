import React, { useState } from "react";
// import Todo from "./Todo";

const NewTodo = ({ addTask }) => {
	const [task, setTask] = useState("");

	const onChange = (e) => {
		setTask(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (!task) {
			alert("Please add text");
			return;
		}
		addTask(task);
	};

	return (
		<div className="new-task">
			<form className="new-task__form" onSubmit={onSubmit}>
				<label htmlFor="new-task__content">New Todo: </label>
				<input
					id="new-task__content"
					className="new-task__content"
					type="text"
					onChange={onChange}
					value={task}
				/>

				<button className="new-task__btn">Add</button>
			</form>
		</div>
	);
};

export default NewTodo;
