import { combineReducers } from 'redux'
import listsReducer from './lists-reducer'
import tagsReducer from './tags-reducer'
import deletedReducer from './deleted-reducer'

export default combineReducers({
  allLists: listsReducer,
  remoteTags: tagsReducer,
  deletedTodos: deletedReducer
})
