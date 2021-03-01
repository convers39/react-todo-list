import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import { AuthContext } from "./Auth";
import { db } from "../firebase/config";
import List from "./List";
import NewTodo from "./NewTodo";
import Tags from "./Tags";

const ListBoard = () => {
	const [lists, setLists] = useState({});
	const [initials, setInitials] = useState({});
	const [tags, setTags] = useState({});
	const { uid, isLoggedIn } = useContext(AuthContext);

	useEffect(() => {
		const tagsUrl = `all_lists/${uid}/tags`;
		db.ref(tagsUrl)
			.get()
			.then((tags = {}) => {
				console.log("tags", tags.val());
				setTags(tags.val());
			});
	}, [uid]);

	const filterTag = (tagList) => {
		if (!tagList.length) {
			setLists(initials);
			return;
		}

		let newList = {};
		let copy = initials;
		console.log("initial copy", copy);
		// check each todo tags contains all tags in tagList
		const checkSubArray = (arr, sub) => sub.every((v) => arr.includes(v));
		// loop over all todo list
		for (const list in copy) {
			console.log("before", list, newList);
			newList[list] = { name: list, todos: [] };
			newList[list].todos = copy[list].todos.filter((todo) => {
				if (todo.hasOwnProperty("tags")) {
					return checkSubArray(todo.tags, tagList);
				}
				return false;
			});
			console.log("after", newList);
		}
		console.log("filtered", newList);
		setLists(newList);
		// check if include all tags in taglist

		// for (const tag of tagList) {
		// 	if (Object.keys(tags).includes(tag)) {
		// 		let target = tags[tag];
		// 		for (const [listName, todoId] of Object.entries(target)) {
		// 			for (const key in initials) {
		// 				console.log(
		// 					"target list name",
		// 					target,
		// 					"list key",
		// 					key,
		// 				);
		// 				if (key === listName) {
		// 					newList[key] = {
		// 						name: key,
		// 						todos: initials[key].todos.filter(
		// 							(todo) => todo.id === todoId,
		// 						),
		// 					};
		// 					console.log("check newlist", newList);
		// 				}
		// 			}
		// 		}
		// 	}
		// }
		// console.log("filter list", newList);
	};

	useEffect(() => {
		db.ref(`all_lists/${uid}`).on("value", (snapshot) => {
			let allLists = {};
			console.log("list board use effect");
			snapshot.forEach((snap) => {
				const { name, todos } = snap.val();
				if (todos && name !== "deleted" && "tags") {
					allLists[snap.val().name] = snap.val();
				}
				setLists({ ...allLists });
				setInitials({ ...allLists });
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

		db.ref(`${baseUrl}`).set(todos).catch(console.error);
		db.ref(`${deletedUrl}`).set(deleted).catch(console.error);

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
	const addTodo = (task, listName, date, tags = []) => {
		let baseUrl = `all_lists/${uid}/${listName}`;

		const newTodo = {
			id: `todo_${Date.now()}`,
			task: task,
			created: new Date().toLocaleDateString(),
			date: date,
			finished: false,
			deleted: false,
			tags: tags,
		};
		let todos = lists[listName] ? lists[listName].todos : [];
		todos = todos.filter(Boolean);
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
	const onDragEnd = (result, lists, setLists) => {
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

			db.ref(`all_lists/${uid}/${sourceListName}/todos`).set(sourceItems);
			db.ref(`all_lists/${uid}/${destListName}/todos`).set(destItems);
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

			db.ref(`all_lists/${uid}/${sourceListName}/todos`).set(sourceItems);
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
										content={list.todos}
										onDelete={onDelete}
										addTodo={addTodo}
										sort={sort}
									/>
								);
							},
						)}
					</DragDropContext>
				) : (
					<h2> No Results</h2>
				)}
			</div>
		</div>
	);
};

export default ListBoard;
