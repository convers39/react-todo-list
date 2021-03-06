const INITIALIZE = 'INITIALIZE'
const FETCH_LISTS = 'FETCH_LISTS'
const ADD_TODO = 'ADD_TODO'
const DELETE_TODO = 'DELETE_TODO'
const MOVE_TODO = 'MOVE_TODO'
const SORT_TODO = 'SORT_TODO'
const FILTER_TODO = 'FILTER_TODO'

const listsReducer = (state = {}, action) => {
  const { type, payload } = action
  const lists = state
  switch (type) {
    case FETCH_LISTS:
      return payload.allLists
    case INITIALIZE:
      return payload.initial
    case ADD_TODO:
      const { newList, listName } = payload
      return { ...lists, [listName]: newList }
    case DELETE_TODO:
      return payload.newAllLists
    case SORT_TODO:
      return {
        ...lists,
        [payload.listName]: {
          name: payload.listName,
          todos: payload.sortedList
        }
      }
    case FILTER_TODO:
      return payload.newAllLists
    case MOVE_TODO:
      return payload.newAllLists
    default:
      console.log('reducer default', state)
      return state
  }
}

export default listsReducer
