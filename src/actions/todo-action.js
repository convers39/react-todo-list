import { db } from '../firebase/config'
// action creator fetch all lists
export const fetchLists = (uid) => {
  return (dispatch, getState) => {
    db.ref(`all_lists/${uid}`).on('value', (snapshot) => {
      console.log('snapshot remote lists', snapshot.val())
      dispatch({ type: 'FETCH_LISTS', payload: { allLists: snapshot.val() } })
    })
    // allLists = await (await db.ref(`all_lists/${uid}`).get()).val();
  }
}

export const fetchDeleted = (uid) => {
  return (dispatch, getState) => {
    // api call
    db.ref(`all_lists/${uid}/deleted`).on('value', (snapshot) => {
      dispatch({ type: 'FETCH_DELETED', payload: '' })
    })
  }
}

export const addTodo = (uid, listName, newTodo) => {
  return async (dispatch, getState) => {
    const lists = getState().allLists
    // check if the input list name exist, set its todos to empty array if not

    console.log('new todo', newTodo)
    const currentList = lists[listName]
    let todos =
      currentList && Object.keys(currentList) && currentList.todos
        ? currentList.todos
        : []

    // clear empty items in todos, which will lead to error when write the DB
    todos = todos.filter(Boolean)

    // set a new list with input list name and todos, then update remove and local
    const newList = { name: listName, todos: [newTodo, ...todos] }
    console.log('newlist', newList)
    await db
      .ref(`all_lists/${uid}/${listName}`)
      .set(newList)
      .catch(console.error)

    // dispatch action to reducer
    dispatch({ type: 'ADD_TODO', payload: { newList, listName } })
  }
}

export const deleteTodo = (uid, listName, todoId) => {
  return (dispatch, getState) => {
    const lists = getState().allLists
    const deleted = lists.deleted
    const baseUrl = `all_lists/${uid}/${listName}/todos`
    const deletedUrl = `all_lists/${uid}/deleted/todos`
    console.log('lists in delete', lists)
    const todos = [...lists[listName].todos]
    // let deleted = await (await db.ref(`${deletedUrl}`).get()).val();

    // check if deleted todos exist, if not set to empty array
    const deletedTodos =
      Object.keys(deleted).length && deleted.todos ? [...deleted.todos] : []

    // retrieve the deleted todo item, push to deleted todos
    // let removed
    for (let index = 0; index < todos.length; index++) {
      const todo = todos[index]
      if (todo.id === todoId) {
        todo.deleted = 1
        var [removed] = todos.splice(index, 1)
        deletedTodos.push(removed)
      }
    }

    // set new deleted todo list to local and remote
    const deletedList = { name: 'deleted', todos: deletedTodos }
    db.ref(`${deletedUrl}`).set(deletedList).catch(console.error)
    // db.ref(`${deletedUrl}`).push(removed).catch(console.error)

    // set updated list to remote
    db.ref(`${baseUrl}`).set(todos).catch(console.error)

    // in case the original list is empty after deletion
    const copy = {}
    for (const [k, v] of Object.entries(lists)) {
      if (k !== listName) copy[k] = v
    }
    // update local lists, empty todo list will lead to error on dnd-beautiful
    const newAllLists =
      todos && todos.length
        ? {
            ...lists,
            [listName]: {
              name: listName,
              todos: todos
            }
          }
        : { ...copy }

    dispatch({ type: 'DELETE_TODO', payload: { newAllLists } })
  }
}

export const sortTodo = (uid, sorting, listName) => {
  return (dispatch, getState) => {
    const lists = getState().allLists
    const baseUrl = `all_lists/${uid}/${listName}/todos`
    const copy = [...lists[listName].todos]

    copy.sort((a, b) => {
      return sorting === 'ASC'
        ? Date.parse(a.created) - Date.parse(b.created)
        : Date.parse(b.created) - Date.parse(a.created)
    })

    db.ref(`${baseUrl}`)
      .set(copy)
      .then(() => {
        dispatch({
          type: 'SORT_TODO',
          payload: { sortedList: copy, listName }
        })
      })
      .catch(console.error)
  }
}

export const filterTags = (tagList, initials) => {
  return (dispatch, getState) => {
    // when tag list is empty, set to initial lists
    console.log('taglist', tagList)
    if (!tagList.length) {
      dispatch({
        type: 'FILTER_TODO',
        payload: { newAllLists: initials }
      })
    } else {
      // set a copy of initial lists
      const newAllLists = {}
      const copy = { ...initials }
      console.log('initial lists before filter', copy)

      // check each todo tags contains all tags in tagList
      const checkSubArray = (arr, sub) => sub.every((v) => arr.includes(v))

      // loop over all todo list
      for (const listName in copy) {
        // initialize todos as empty array
        newAllLists[listName] = { name: listName, todos: [] }
        newAllLists[listName].todos = copy[listName].todos.filter((todo) => {
          // check if current todo has tags, if tags is an empty array,
          // it will not be saved in remote DB, which will lead to todo.tags = undefined issue
          if (todo.hasOwnProperty('tags')) {
            return checkSubArray(todo.tags, tagList)
          }
          return false
        })
      }
      console.log('filtered lists', newAllLists)
      dispatch({ type: 'FILTER_TODO', payload: { newAllLists } })
    }
  }
}

export const moveTodo = (uid, result) => {
  return (dispatch, getState) => {
    if (!result.destination) return
    const lists = getState().allLists
    const { source, destination } = result
    const sourceListName = source.droppableId
    const destListName = destination.droppableId

    const sourceList = lists[sourceListName]
    const sourceListTodos = [...sourceList.todos]

    // check if source list and destination list are the same
    if (sourceListName !== destListName) {
      const destList = lists[destListName]
      const destListTodos = [...destList.todos]
      const [removed] = sourceListTodos.splice(source.index, 1)
      destListTodos.splice(destination.index, 0, removed)

      // update both source and destination lists
      db.ref(`all_lists/${uid}/${sourceListName}/todos`).set(sourceListTodos)
      db.ref(`all_lists/${uid}/${destListName}/todos`).set(destListTodos)

      const newAllLists = {
        ...lists,
        [sourceListName]: {
          name: sourceListName,
          todos: sourceListTodos
        },
        [destListName]: {
          name: destListName,
          todos: destListTodos
        }
      }
      dispatch({ type: 'MOVE_TODO', payload: { newAllLists } })
    } else {
      // source list and destination list are the same, remove and then insert
      const [removed] = sourceListTodos.splice(source.index, 1)
      sourceListTodos.splice(destination.index, 0, removed)

      db.ref(`all_lists/${uid}/${sourceListName}/todos`).set(sourceListTodos)
      const newAllLists = {
        ...lists,
        [sourceListName]: {
          name: sourceListName,
          todos: sourceListTodos
        }
      }
      dispatch({ type: 'MOVE_TODO', payload: { newAllLists } })
    }
  }
}
