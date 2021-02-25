import React, { useState } from "react";

const Todo = ({ id, text, createdAt, onDelete }) => {
	const [finished, setFinished] = useState(false);
	const toggleTodo = () => {
		setFinished(!finished);
		console.log("todo", id, finished);
	};
	return (
		<div className="todo">
			<input type="checkbox" onChange={toggleTodo} checked={finished} />
			{text}
			{/* <span>{createdAt}</span> */}
			<button onClick={() => onDelete(id)}>Delete</button>
		</div>
	);
};

export default Todo;
