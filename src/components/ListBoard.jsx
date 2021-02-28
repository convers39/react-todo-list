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
				const { name, todos } = snap.val();
				if (todos && name !== "deleted") {
					allLists[snap.val().name] = snap.val();
				}
				setLists({ ...allLists });
			});
		});
	}, [uid]);

	// mark as deleted and move to deleted list, edge case of empty list
	const onDelete = async (todoId, listName) => {
		let baseUrl = `all_lists/${uid}/${listName}/todos`;
		let deletedUrl = `all_lists/${uid}/deleted/todos`;
		const todos = [...lists[listName].todos];
		let deleted = await (await db.ref(`${deletedUrl}`).get()).val();
		if (!deleted) {
			deleted = [];
		}
		let removed;
		for (let index = 0; index < todos.length; index++) {
			const todo = todos[index];
			if (todo.id === todoId) {
				todo.deleted = 1;
				removed = todos.splice(index, 1);
				deleted.push(removed[0]);
			}
		}

		await db.ref(`${baseUrl}`).set(todos).catch(console.error);
		await db.ref(`${deletedUrl}`).set(deleted).catch(console.error);

		let copy = {};
		for (const [k, v] of Object.entries(lists)) {
			if (k !== listName) copy[k] = v;
		}

		const allLists =
			todos && todos.length
				? {
						...lists,
						[listName]: {
							name: listName,
							todos: todos,
						},
				  }
				: { ...copy };
		setLists(allLists);
	};

	// add new todo
	const addTodo = (task, listName, date) => {
		let baseUrl = `all_lists/${uid}/${listName}`;

		const newTodo = {
			id: `todo_${Date.now()}`,
			task: task,
			created: new Date().toLocaleDateString(),
			date: date,
			finished: false,
			deleted: false,
		};
		const todos = lists[listName] ? lists[listName].todos : [];
		const newList = { name: listName, todos: [newTodo, ...todos] };

		db.ref(`${baseUrl}`)
			.set(newList)
			.then((data) => {
				console.log("add new", data);
				setLists({
					...lists,
					[listName]: newList,
				});
			})
			.catch(console.error);
	};

	// sort by latest
	const sort = (sorting, listName) => {
		let baseUrl = `all_lists/${uid}/${listName}/todos`;
		const copy = [...lists[listName].todos];

		copy.sort((a, b) => {
			return sorting == "ASC"
				? Date.parse(a.created) - Date.parse(b.created)
				: Date.parse(b.created) - Date.parse(a.created);
		});
		console.log(copy);
		db.ref(`${baseUrl}`)
			.set(copy)
			.then((data) => {
				console.log("sorting done at", baseUrl, data);
				setLists({
					...lists,
					[listName]: {
						name: listName,
						todos: copy,
					},
				});
			})
			.catch(console.error);
	};

	// drag end
	const onDragEnd = async (result, lists, setLists) => {
		if (!result.destination) return;
		const { source, destination } = result;
		const sourceListName = source.droppableId;
		const destListName = destination.droppableId;
		const sourceList = lists[sourceListName];
		const sourceItems = [...sourceList.todos];

		if (sourceListName !== destListName) {
			const destList = lists[destListName];
			const destItems = [...destList.todos];
			const [removed] = sourceItems.splice(source.index, 1);
			destItems.splice(destination.index, 0, removed);

			await db
				.ref(`all_lists/${uid}/${sourceListName}/todos`)
				.set(sourceItems);
			await db
				.ref(`all_lists/${uid}/${destListName}/todos`)
				.set(destItems);

			setLists({
				...lists,
				[sourceListName]: {
					name: sourceListName,
					todos: sourceItems,
				},
				[destListName]: {
					name: destListName,
					todos: destItems,
				},
			});
		} else {
			const [removed] = sourceItems.splice(source.index, 1);
			sourceItems.splice(destination.index, 0, removed);
			console.log("onDragEnd", sourceList, sourceItems);

			await db
				.ref(`all_lists/${uid}/${sourceListName}/todos`)
				.set(sourceItems);
			setLists({
				...lists,
				[sourceListName]: {
					name: sourceListName,
					todos: sourceItems,
				},
			});
		}
	};

	const style = {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-around",
		backgroundColor: "#eee",
		border: "1px solid #3F51B5",
		height: "100%",
		padding: "2em",
		marginBottom: "3em",
	};

	if (!isLoggedIn) {
		return <Redirect to="/login" />;
	}

	return (
		<div>
			<NewTodo addTodo={addTodo} />
			<div className="list-board" style={style}>
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
								sort={sort}
							/>
						);
					})}
				</DragDropContext>
			</div>
		</div>
	);
};

export default ListBoard;
