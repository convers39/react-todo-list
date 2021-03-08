import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import Todo from './Todo'
import Sorting from './Sorting'

import { listStyles as useStyles } from '../styles/mui-theme'

const List = ({ listName, todos, sort }) => {
  const classes = useStyles()

  const renderTodo = (todo, index) => {
    return <Todo key={todo.id} index={index} todo={todo} listName={listName} />
  }

  return (
    <div className={classes.container}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography variant='h6' align='center'>
            @{listName}({todos.length})
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <Sorting sort={sort} listName={listName} />
            <div className='list-container'>
              {
                <Droppable droppableId={listName}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{
                          opacity: snapshot.isDraggingOver ? 0.9 : 1
                        }}
                      >
                        {todos?.length ? (
                          todos.map((todo, index) => renderTodo(todo, index))
                        ) : (
                          <Typography variant='h4' align='center'>
                            No todos
                          </Typography>
                        )}
                        {provided.placeholder}
                      </div>
                    )
                  }}
                </Droppable>
              }
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default List
