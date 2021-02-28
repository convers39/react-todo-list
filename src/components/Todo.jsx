import React, { useState, useContext, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { db } from "../firebase/config";
import { AuthContext } from "./Auth";

import Checkbox from "@material-ui/core/Checkbox";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

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
							padding: 15,
							margin: "5px",
							backgroundColor: snapshot.isDragging
								? "#9fc4eee"
								: "#3ca3bd",
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
