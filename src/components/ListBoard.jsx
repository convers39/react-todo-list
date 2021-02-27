import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import { AuthContext } from "./Auth";
import { db } from "../firebase/config";
import List from "./List";
import NewTodo from "./NewTodo";

const ListBoard = () => {
	const [lists, setLists] = useState({});
	const { uid, isLoggedIn } = useContext(AuthContext);
	useEffect(() => {
		db.ref(`all_lists/${uid}`).on("value", (snapshot) => {
			let allLists = {};
			console.log("list board use effect");
			snapshot.forEach((snap) => {
				allLists[snap.val().name] = snap.val();
				setLists({ ...allLists });
			});
		});
	}, []);

	const onDelete = (todoId, listName) => {
		let baseUrl = `all_lists/${uid}/${listName}/todos`;
		// db.ref(`${baseUrl}/${todoId}`)
		// 	.remove()
		// 	.then(() => {
		// 		console.log("removed");
		// 	})
		// 	.catch(console.error);
		const todos = lists[listName].todos;
		const newList = todos.filter((todo) => todo.id !== todoId);
		db.ref(`${baseUrl}`)
			.set(newList)
			.then((data) => {
				console.log(data);
				setLists({
					...lists,
					listName: {
						name: listName,
						todos: newList,
					},
				});
			})
			.catch(console.error);
	};

	const addTodo = (task, listName) => {
		let baseUrl = `all_lists/${uid}/${listName}/todos`;
		// check @list group
		const newTodo = {
			id: `todo_${Date.now()}`,
			task: task,
			created: new Date().toLocaleDateString(),
			date: new Date().toLocaleDateString(),
			finished: false,
			deleted: false,
		};
		const todos = lists[listName].todos;
		const newList = [newTodo, ...todos];

		db.ref(`${baseUrl}`)
			.set(newList)
			// .push({
			// 	...newTodo,
			// })
			.then((data) => {
				console.log(data);
				setLists({
					...lists,
					listName: {
						name: listName,
						todos: newList,
					},
				});
			})
			.catch(console.error);
	};

	const onDragEnd = (result, lists, setLists) => {
		if (!result.destination) return;
		const { source, destination } = result;

		if (source.droppableId !== destination.droppableId) {
			const sourceList = lists[source.droppableId];
			const destList = lists[destination.droppableId];
			const sourceItems = [...sourceList.todos];
			const destItems = [...destList.todos];
			const [removed] = sourceItems.splice(source.index, 1);
			destItems.splice(destination.index, 0, removed);
			setLists({
				...lists,
				[source.droppableId]: {
					...sourceList,
					todos: sourceItems,
				},
				[destination.droppableId]: {
					...destList,
					todos: destItems,
				},
			});
		} else {
			const list = lists[source.droppableId];
			const copiedItems = [...list.todos];
			const [removed] = copiedItems.splice(source.index, 1);
			copiedItems.splice(destination.index, 0, removed);
			console.log("onDragEnd", list, copiedItems);
			// lists[source.droppableId].todos = copiedItems;
			setLists({
				...lists,
				[source.droppableId]: {
					name: source.droppableId,
					todos: copiedItems,
				},
			});
		}
	};

	const style = {
		display: "flex",
		justifyContent: "center",
		height: "100%",
		padding: "10",
	};

	if (!isLoggedIn) {
		return <Redirect to="/login" />;
	}

	return (
		<div className="list-board" style={style}>
			<NewTodo addTodo={addTodo} />
			<DragDropContext
				onDragEnd={(result) => onDragEnd(result, lists, setLists)}
			>
				{Object.entries(lists).map(([listName, list], index) => {
					return (
						<List
							listName={listName}
							key={listName}
							content={list.todos}
							onDelete={onDelete}
							addTodo={addTodo}
						/>
					);
				})}
			</DragDropContext>
		</div>
	);
};

export default ListBoard;
