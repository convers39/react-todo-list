import React, { useState, useContext, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import {
	Checkbox,
	ListItem,
	ListItemIcon,
	ListItemText,
	ListItemSecondaryAction,
	IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import { db } from "../firebase/config";
import { AuthContext } from "./Auth";

const Todo = ({ id, task, created, date, onDelete, index, listName }) => {
	// set up toggle finish
	const { uid } = useContext(AuthContext);
	const baseUrl = `all_lists/${uid}/${listName}/todos/${index}`;
	const [finished, setFinished] = useState("");

	useEffect(() => {
		db.ref(`${baseUrl}/finished`)
			.get()
			.then((check) => {
				setFinished(check.val());
			});
	}, [baseUrl]);

	const toggleTodo = () => {
		console.log(baseUrl);
		db.ref(`${baseUrl}`)
			.update({ finished: !finished })
			.then(() => {
				setFinished(!finished);
			});
	};

	return (
		<Draggable key={id} draggableId={id} index={index}>
			{(provided, snapshot) => {
				return (
					<div
						className="todo-item"
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						style={{
							userSelect: "none",
							padding: ".4em",
							margin: ".8em .4em",
							borderRadius: "5px",
							backgroundColor: snapshot.isDragging
								? "#9fc4eee"
								: "#8794b8",
							...provided.draggableProps.style,
						}}
					>
						<ListItem
							role={undefined}
							dense
							button
							ContainerComponent="div"
							onClick={toggleTodo}
						>
							<ListItemIcon>
								<Checkbox
									edge="start"
									color="primary"
									tabIndex={-1}
									disableRipple
									inputProps={{ "aria-labelledby": id }}
									checked={!!finished}
								/>
							</ListItemIcon>
							<ListItemText
								id={id}
								primary={`${task} on ${date}`}
								secondary={`created at ${created}`}
								style={{
									textDecoration: finished
										? "line-through"
										: "none",
								}}
							/>

							<ListItemSecondaryAction>
								<IconButton
									edge="end"
									aria-label="delete"
									onClick={() => onDelete(id, listName)}
								>
									<DeleteIcon />
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
					</div>
				);
			}}
		</Draggable>
	);
};

export default Todo;
