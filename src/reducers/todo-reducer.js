const listsReducer = (lists, action) => {
	const { type, payload } = action;
	if (type === "ADD_TODO") {
		const { todoData, todoId, listName } = payload;
		const todos = lists[listName].todos;
		const copy = [todoData, ...todos];
		lists[listName] = copy;
		return lists;
	}
	if (type === "DELETE_TODO") {
		const { todoId, listName } = payload;
		const todos = lists[listName].todos;
		todos.filter((todo) => todo.id !== todoId);
		return lists;
	}
	return lists;
};

export default listsReducer;
