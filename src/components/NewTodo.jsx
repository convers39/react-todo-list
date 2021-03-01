import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";

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
		// check @ mark
		let listName;
		let taskText = "";
		if (taskContent.startsWith("@")) {
			taskText = taskContent.split(" ").slice(1).join(" ");
			listName = taskContent.split(" ")[0].split("@")[1];
			if (!taskText) {
				let temp = listName;
				listName = "default";
				taskText = temp;
			}
		}
		let date = e.target.elements[1].value;
		// add tags
		let tags = [];
		if (taskText.includes("#")) {
			const re = /^#\w+$/;
			tags = taskText.split(" ").filter((w) => w.match(re));
			tags = tags.map((tag) => tag.replace("#", ""));
			taskText = taskText
				.split(" ")
				.filter((w) => !w.startsWith("#"))
				.join(" ");
		}
		console.log(date, tags, taskText, listName);
		setTask("");
		addTodo(taskText, listName, date, tags);
	};

	const style = {
		padding: "1em 1em",
		margin: "0 2em",
		display: "flex",
		// flexWrap: "wrap",
		alignItems: "baseline",
		justifyContent: "space-between",
	};

	return (
		<div className="new-task" style={{ border: "1px solid #3F51B5" }}>
			<form
				style={style}
				noValidate
				autoComplete="off"
				onSubmit={onSubmit}
			>
				<TextField
					id="standard-basic"
					label="New Todo"
					required
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
