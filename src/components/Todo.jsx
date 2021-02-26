import React, { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";

const ItemTypes = { TODO: "todo" };

const Todo = ({ id, task, createdAt, onDelete, moveTodo, index }) => {
	// set up toggle finish
	const [finished, setFinished] = useState(false);
	const toggleTodo = () => {
		setFinished(!finished);
	};

	// set up drag and drop
	const ref = useRef(null);
	const [{ handlerId }, drop] = useDrop({
		accept: ItemTypes.TODO,
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			};
		},
		hover(item, monitor) {
			if (!ref.current) {
				return;
			}
			const dragIndex = item.index;
			const hoverIndex = index;
			if (dragIndex === hoverIndex) {
				return;
			}
			const hoverBoundingRect = ref.current?.getBoundingClientRect();
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const clientOffset = monitor.getClientOffset();
			const hoverClientY = clientOffset.y - hoverBoundingRect.top;

			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}
			moveTodo(dragIndex, hoverIndex);
			item.index = hoverIndex;
		},
	});
	const [{ isDragging }, drag] = useDrag({
		item: { type: ItemTypes.TODO, id, index },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});
	const opacity = isDragging ? 0 : 1;

	drag(drop(ref));
	return (
		<div
			className="todo"
			style={{ opacity }}
			ref={ref}
			data-handler-id={handlerId}
			// onDragStart={(e) => (e.target.style.cursor = "grabbing")}
		>
			<div>
				<input
					className="todo__finish-check"
					id={`finish-check-${id}`}
					type="checkbox"
					onChange={toggleTodo}
					checked={finished}
				/>
				<label htmlFor={`finish-check-${id}`}>{task}</label>
			</div>
			<div className="todo__created-at">{createdAt}</div>
			<button onClick={() => onDelete(id)}>Delete</button>
		</div>
	);
};

export default Todo;
