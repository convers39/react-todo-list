export const addTodo = (listName, todoData) => {
	const todoId = todoData.id;
	return {
		type: "ADD_TODO",
		payload: { todoData, todoId, listName },
	};
};

export const deleteTodo = (listName, todoId) => {
	return { type: "DELETE_TODO", payload: { todoId, listName } };
};

export const moveTodo = (todoId, originListName, destinationListName) => {
	return {
		type: "MOVE_TODO",
		payload: {
			todoId,
			originListName,
			destinationListName,
		},
	};
};
