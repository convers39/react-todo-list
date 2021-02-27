import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

import Checkbox from "@material-ui/core/Checkbox";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import { db } from "../firebase/config";

const Todo = ({ id, task, created, onDelete, index, listName }) => {
	// set up toggle finish
	const [finished, setFinished] = useState(false);
	const toggleTodo = () => {
		setFinished(!finished);
	};

	return (
		<Draggable
			// className="todo"
			key={id}
			draggableId={id}
			index={index}
			// onDragStart={(e) => (e.target.style.cursor = "grabbing")}
		>
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
							backgroundColor: snapshot.isDragging
								? "lightblue"
								: "lightgrey",
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
									tabIndex={-1}
									disableRipple
									inputProps={{ "aria-labelledby": id }}
									checked={finished}
								/>
							</ListItemIcon>
							<ListItemText
								id={id}
								primary={`${task} - ${created}`}
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
