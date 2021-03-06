import React, { useState, useEffect } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import {
  Checkbox,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { useDispatch } from 'react-redux'

import { db } from '../firebase/config'
import { useAuth } from '../contexts/Auth'
import { deleteTodo } from '../actions/todo-action'
import { todoStyles as useStyles } from '../styles/mui-theme'

const Todo = ({ todo, index, listName }) => {
  const { id, task, created, date } = todo
  const { uid } = useAuth()
  const [finished, setFinished] = useState('')
  const dispatch = useDispatch()
  const classes = useStyles()

  const baseUrl = `all_lists/${uid}/${listName}/todos/${index}`
  useEffect(() => {
    db.ref(`${baseUrl}/finished`)
      .get()
      .then((check) => {
        setFinished(check.val())
      })
  }, [baseUrl])

  const toggleTodo = () => {
    db.ref(`${baseUrl}`)
      .update({ finished: !finished })
      .then(() => {
        setFinished(!finished)
      })
  }

  // mark as deleted and move to deleted list, careful on edge case of empty list
  const onDelete = (listName, todoId) => {
    dispatch(deleteTodo(uid, listName, todoId))
  }

  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            className={classes.container}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              userSelect: 'none',
              ...provided.draggableProps.style
            }}
          >
            <Paper
              elevation={1}
              style={{
                opacity: snapshot.isDragging ? 0.9 : 1
              }}
            >
              <ListItem
                role={undefined}
                dense
                button
                ContainerComponent='div'
                onClick={toggleTodo}
              >
                <ListItemIcon>
                  <Checkbox
                    edge='start'
                    color='secondary'
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': id }}
                    checked={!!finished}
                  />
                </ListItemIcon>
                <ListItemText
                  id={id}
                  primary={`${task} on ${date}`}
                  secondary={`created at ${created}`}
                  style={{
                    // textTransform: "capitalize",
                    textDecoration: finished ? 'line-through' : 'none'
                  }}
                />

                <ListItemSecondaryAction>
                  <IconButton
                    edge='end'
                    aria-label='delete'
                    color='secondary'
                    onClick={() => onDelete(listName, id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </Paper>
          </div>
        )
      }}
    </Draggable>
  )
}

export default Todo
