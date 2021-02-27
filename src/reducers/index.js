import { combineReducers } from "redux";
import listBoardReducer from "./list-reducer";
import todoReducer from "./todo-reducer";

export default combineReducers({
	listBoardReducer,
	todoReducer,
});
