import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const NewTodo = ({ addTodo }) => {
	const [task, setTask] = useState("");

	const onTask = (e) => {
		setTask(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		let taskContent = task.trim();
		if (!taskContent) {
			alert("task cannot be empty");
			return;
		}
		let listName = "default";
		let taskText = "";
		if (taskContent.startsWith("@")) {
			taskText = taskContent.split(" ").slice(1).join(" ");
			listName = taskContent.split(" ")[0].split("@")[1];
		}
		let date = e.target.elements[1].value;
		console.log(date, e.target.elements);
		setTask("");
		addTodo(taskText, listName, date);
	};

	const style = {
		padding: "10px 30px",
		margin: "0 10px",
		display: "flex",
		alignItems: "baseline",
		justifyContent: "space-between",
	};

	return (
		<div className="new-task" style={{ border: "1px solid lightgray" }}>
			<form
				style={style}
				noValidate
				autoComplete="off"
				onSubmit={onSubmit}
			>
				<TextField
					id="standard-basic"
					label="New Todo"
					// fullWidth={true}
					onChange={onTask}
					value={task}
					style={{ width: "50%" }}
					placeholder="e.g. '@list task' to create or add to a list"
				/>
				<TextField
					id="datetime-local"
					label="Set Date"
					type="date"
					// defaultValue={new Date()
					// 	.toLocaleDateString()
					// 	.replaceAll("/", "-")}
					InputLabelProps={{
						shrink: true,
					}}
				/>
				<Button
					variant="outlined"
					color="primary"
					type="submit"
					style={{ marginLeft: 30 }}
				>
					Add
				</Button>
			</form>
		</div>
	);
};

export default NewTodo;
