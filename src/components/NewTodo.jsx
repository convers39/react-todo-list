import React, { useState } from "react";
import Todo from "./Todo";

const NewTodo = ({ onAdd }) => {
	const [text, setText] = useState("");

	const onChange = (e) => {
		setText(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (!text) {
			alert("Please add text");
			return;
		}
		onAdd(text);
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<input type="text" onChange={onChange} value={text} />
				<button>Add</button>
			</form>
		</div>
	);
};

export default NewTodo;
