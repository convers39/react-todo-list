import React, { useState, useContext, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Typography } from "@material-ui/core";

import { AuthContext } from "./Auth";
import { db } from "../firebase/config";
import List from "./List";
import NewTodo from "./NewTodo";
import Tags from "./Tags";

const ListBoard = () => {
	const { uid } = useContext(AuthContext);
	const [lists, setLists] = useState({});
	const [initials, setInitials] = useState({});
	const [deleted, setDeleted] = useState({});

	/* retrieve tags
	const [tags, setTags] = useState({});
	useEffect(() => {
		const tagsUrl = `all_lists/${uid}/tags`;
		db.ref(tagsUrl)
			.get()
			.then((tags = {}) => {
				console.log("tags", tags.val());
				setTags(tags.val());
			});
	}, [uid]);
	*/

	// initialize all lists
	useEffect(() => {
		db.ref(`all_lists/${uid}`).on("value", (snapshot) => {
			let allLists = {};
			console.log("list board use effect");
			snapshot.forEach((snap) => {
				const { name, todos } = snap.val();
				if (todos && name === "deleted") {
					setDeleted(snap.val());
				}
				if (todos && name !== "deleted" && "tags") {
					allLists[snap.val().name] = snap.val();
				}
				setLists({ ...allLists });
				setInitials({ ...allLists });
			});
		});
	}, [uid]);

	// accept a tags array, filter todos which contains all tags in the tags array
	const filterTag = (tagList) => {
		// when tag list is empty, set to initial lists
		if (!tagList.length) {
			setLists(initials);
			return;
		}

		// set a copy of initial lists
		let newAllLists = {};
		let copy = { ...initials };
		console.log("initial lists before filter", copy);

		// check each todo tags contains all tags in tagList
		const checkSubArray = (arr, sub) => sub.every((v) => arr.includes(v));

		// loop over all todo list
		for (const listName in copy) {
			// initialize todos as empty array
			newAllLists[listName] = { name: listName, todos: [] };
			newAllLists[listName].todos = copy[listName].todos.filter(
				(todo) => {
					// check if current todo has tags, if tags is an empty array,
					// it will not be saved in remote DB, which will lead to todo.tags = undefined issue
					if (todo.hasOwnProperty("tags")) {
						return checkSubArray(todo.tags, tagList);
					}
					return false;
				},
			);
		}
		console.log("filtered lists", newAllLists);
		setLists(newAllLists);

		/* old terrible approach, do not try to understand it
		for (const tag of tagList) {
		 	if (Object.keys(tags).includes(tag)) {
		 		let target = tags[tag];
		 		for (const [listName, todoId] of Object.entries(target)) {
		 			for (const key in initials) {
		 				if (key === listName) {
		 					newList[key] = {
		 						name: key,
		 						todos: initials[key].todos.filter(
		 							(todo) => todo.id === todoId,
		 						),
		 					};
		 				}
		 			}
		 		}
		 	}
		 }
		*/
	};

	// mark as deleted and move to deleted list, careful on edge case of empty list
	const onDelete = (todoId, listName) => {
		const baseUrl = `all_lists/${uid}/${listName}/todos`;
		const deletedUrl = `all_lists/${uid}/deleted`;
		const todos = [...lists[listName].todos];
		// let deleted = await (await db.ref(`${deletedUrl}`).get()).val();

		// check if deleted todos exist, if not set to empty array
		let deletedTodos =
			Object.keys(deleted).length && deleted.todos
				? [...deleted.todos]
				: [];

		// retrieve the deleted todo item, push to deleted todos
		let removed;
		for (let index = 0; index < todos.length; index++) {
			const todo = todos[index];
			if (todo.id === todoId) {
				todo.deleted = 1;
				[removed] = todos.splice(index, 1);
				deletedTodos.push(removed);
			}
		}

		// set new deleted todo list to local and remote
		const deletedList = { name: "deleted", todos: deletedTodos };
		setDeleted(deletedList);
		db.ref(`${deletedUrl}`).set(deletedList).catch(console.error);

		// set updated list to remote
		db.ref(`${baseUrl}`).set(todos).catch(console.error);

		// in case the original list is empty after deletion
		let copy = {};
		for (const [k, v] of Object.entries(lists)) {
			if (k !== listName) copy[k] = v;
		}

		// update local lists, empty todo list will lead to error on dnd-beautiful
		const newAllLists =
			todos && todos.length
				? {
						...lists,
						[listName]: {
							name: listName,
							todos: todos,
						},
				  }
				: { ...copy };
		setLists(newAllLists);
	};

	// add a new todo to target list, be triggered in NewTodo component
	const addTodo = (task, listName, date, tags = []) => {
		let baseUrl = `all_lists/${uid}/${listName}`;

		// structure new todo item
		const newTodo = {
			id: `todo_${Date.now()}`,
			task: task,
			created: new Date().toLocaleDateString("en-CA"),
			date: date || new Date().toLocaleDateString("en-CA"),
			finished: false,
			deleted: false,
			tags: tags,
		};

		// check if the input list name exist, set its todos to empty array if not
		const currentList = lists[listName];
		let todos =
			currentList && Object.keys(currentList) && currentList.todos
				? currentList.todos
				: [];

		// clear empty items in todos, which will lead to error when write the DB
		todos = todos.filter(Boolean);

		// set a new list with input list name and todos, then update remove and local
		const newList = { name: listName, todos: [newTodo, ...todos] };
		db.ref(`${baseUrl}`)
			.set(newList)
			.then(() => {
				setLists({
					...lists,
					[listName]: newList,
				});
			})
			.catch(console.error);
	};

	// sort by latest or created
	const sort = (sorting, listName) => {
		let baseUrl = `all_lists/${uid}/${listName}/todos`;
		const copy = [...lists[listName].todos];

		copy.sort((a, b) => {
			return sorting === "ASC"
				? Date.parse(a.created) - Date.parse(b.created)
				: Date.parse(b.created) - Date.parse(a.created);
		});

		db.ref(`${baseUrl}`)
			.set(copy)
			.then(() => {
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

	// After drag and drop, update local and remote lists
	const onDragEnd = (result, lists, setLists) => {
		if (!result.destination) return;
		const { source, destination } = result;
		const sourceListName = source.droppableId;
		const destListName = destination.droppableId;

		const sourceList = lists[sourceListName];
		const sourceListTodos = [...sourceList.todos];

		// check if source list and destination list are the same
		if (sourceListName !== destListName) {
			const destList = lists[destListName];
			const destListTodos = [...destList.todos];
			const [removed] = sourceListTodos.splice(source.index, 1);
			destListTodos.splice(destination.index, 0, removed);

			// update both source and destination lists
			db.ref(`all_lists/${uid}/${sourceListName}/todos`).set(
				sourceListTodos,
			);
			db.ref(`all_lists/${uid}/${destListName}/todos`).set(destListTodos);
			setLists({
				...lists,
				[sourceListName]: {
					name: sourceListName,
					todos: sourceListTodos,
				},
				[destListName]: {
					name: destListName,
					todos: destListTodos,
				},
			});
		} else {
			// source list and destination list are the same, remove and then insert
			const [removed] = sourceListTodos.splice(source.index, 1);
			sourceListTodos.splice(destination.index, 0, removed);

			db.ref(`all_lists/${uid}/${sourceListName}/todos`).set(
				sourceListTodos,
			);
			setLists({
				...lists,
				[sourceListName]: {
					name: sourceListName,
					todos: sourceListTodos,
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

	return (
		<div>
			<NewTodo addTodo={addTodo} />
			<Tags filterTag={filterTag} />
			<div className="list-board" style={style}>
				{Object.keys(lists).length ? (
					<DragDropContext
						onDragEnd={(result) =>
							onDragEnd(result, lists, setLists)
						}
					>
						{Object.entries(lists).map(
							([listName, list], index) => {
								return (
									<List
										listName={listName}
										key={listName}
										todos={list.todos}
										onDelete={onDelete}
										addTodo={addTodo}
										sort={sort}
									/>
								);
							},
						)}
					</DragDropContext>
				) : (
					<Typography variant="h3" align="center">
						Loading todos...
					</Typography>
				)}
			</div>
		</div>
	);
};

export default ListBoard;
