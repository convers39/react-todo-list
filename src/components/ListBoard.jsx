import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DragDropContext } from 'react-beautiful-dnd'
import { Typography } from '@material-ui/core'

import { useAuth } from '../contexts/Auth'
import { fetchLists, moveTodo } from '../actions/todo-action'
import { listBoardStyles as useStyles } from '../styles/mui-theme'

import List from './List'
import NewTodo from './NewTodo'
import Tags from './Tags'

const ListBoard = () => {
  const { uid } = useAuth()
  const classes = useStyles()
  const dispatch = useDispatch()
  const lists = useSelector((state) => state.allLists)

  useEffect(() => {
    dispatch(fetchLists(uid))
  }, [uid, dispatch])

  // After drag and drop, update local and remote lists
  const onDragEnd = (result) => {
    dispatch(moveTodo(uid, result))
  }

  // render todo list
  const renderList = (listName, todos) => {
    return <List listName={listName} key={listName} todos={todos} />
  }

  console.log('lists in board', lists)

  return (
    <div className={classes.container}>
      <NewTodo />
      <Tags />
      <div className={classes.board}>
        {Object.keys(lists).length ? (
          <DragDropContext onDragEnd={onDragEnd}>
            {Object.entries(lists).map(
              ([listName, list], index) =>
                listName !== 'deleted' && renderList(listName, list.todos)
            )}
          </DragDropContext>
        ) : (
          <Typography variant='h5' align='center'>
            Loading todos...
          </Typography>
        )}
      </div>
    </div>
  )
}

export default ListBoard
