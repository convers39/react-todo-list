const listBoardReducer = (lists, action) => {
	const { type, payload } = action;
	if (type === "ADD_TODO") {
		const { todoId, listName } = payload;
		return;
	}
	return lists;
};

export default listBoardReducer;
