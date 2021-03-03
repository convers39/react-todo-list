import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { Typography } from '@material-ui/core'

import Todo from './Todo'
import Sorting from './Sorting'

const List = ({ listName, todos, sort, onDelete }) => {
  const renderTodo = (todo, index) => {
    return (
      <Todo
        key={todo.id}
        index={index}
        todo={todo}
        onDelete={onDelete}
        listName={listName}
      />
    )
  }

  const style = {
    padding: '1em',
    backgroundColor: 'lightgrey',
    borderRadius: '5px',
    margin: '1em 0',
    width: '400px'
  }

  return (
    <div style={style}>
      <Typography variant='h5' align='center'>
        @{listName}
      </Typography>
      <Sorting sort={sort} listName={listName} />
      <div className='list-container'>
        {todos.length ? (
          <Droppable droppableId={listName}>
            {(provided, snapshot) => {
						  return (
  <div
    ref={provided.innerRef}
    {...provided.droppableProps}
    style={{
									  background: snapshot.isDraggingOver
									    ? '#6a80aa'
									    : '#50658d',
									  padding: '.5em',
									  borderRadius: '5px'
									  // minHeight: 400,
    }}
  >
    {todos.map((todo, index) =>
									  renderTodo(todo, index)
    )}
    {provided.placeholder}
  </div>
						  )
            }}
          </Droppable>
        ) : (
          <Typography variant='h4' align='center'>
            No todos
          </Typography>
        )}
      </div>
    </div>
  )
}

export default List
