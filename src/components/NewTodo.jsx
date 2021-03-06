import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  Button,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Autocomplete from '@material-ui/lab/Autocomplete'

import { useAuth } from '../contexts/Auth'
import { addTodo } from '../actions/todo-action'
import { addTags } from '../actions/tag-action'

import { newTodoStyles as useStyles } from '../styles/mui-theme'

const NewTodo = () => {
  const [task, setTask] = useState('')
  const [error, setError] = useState(false)
  const [tags, setTags] = useState([]) // local tags for new todo

  const { uid } = useAuth()
  const classes = useStyles()
  const dispatch = useDispatch()
  const remoteTags = useSelector((state) => state.remoteTags)

  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'Enter':
      case ',':
      case ' ': {
        event.preventDefault()
        event.stopPropagation()
        if (event.target.value.length > 0) {
          setTags([...tags, event.target.value])
        }
        break
      }
      default:
    }
  }

  const onTask = (e) => {
    const task = e.target.value
    if (task) {
      setError(false)
    }
    setTask(task)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const taskContent = task.trim()
    if (!taskContent) {
      setError(true)
      return
    }

    // check @ mark and list name
    let listName = 'default'
    let taskText = ''
    if (taskContent.startsWith('@')) {
      taskText = taskContent.split(' ').slice(1).join(' ')
      listName = taskContent.split(' ')[0].split('@')[1]
      // if task text is empty, set @mark content to task, and list name to default
      if (!taskText) {
        // or just set error?
        const temp = listName
        listName = 'default'
        taskText = temp
      }
    }
    const date = e.target.elements[1].value

    // structure new todo item
    const newTodo = {
      id: `todo_${Date.now()}`,
      task: task,
      list: listName,
      created: new Date().toLocaleDateString('en-CA'),
      date: date || new Date().toLocaleDateString('en-CA'),
      finished: false,
      deleted: false,
      tags: tags
    }
    setTask('')
    setTags([])
    dispatch(addTags(uid, tags))
    dispatch(addTodo(uid, listName, newTodo))
  }

  return (
    <div className={classes.container}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography variant='h6'>New Todo</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form className={classes.form} onSubmit={onSubmit}>
            <TextField
              id='standard-basic'
              label='Task'
              required
              onChange={onTask}
              value={task}
              error={error}
              helperText={error ? 'Use space between each words' : ''}
              fullWidth
              placeholder="'@list task' to target a list"
            />
            <Autocomplete
              multiple
              freeSolo
              fullWidth
              id='tags-autocomplete'
              options={remoteTags}
              getOptionLabel={(option) => option}
              value={tags}
              onChange={(e, newValue) => setTags(newValue)}
              filterSelectedOptions
              renderInput={(params) => {
                params.inputProps.onKeyDown = handleKeyDown
                return (
                  <TextField
                    {...params}
                    variant='standard'
                    margin='dense'
                    label='Tags'
                    placeholder='Space or , to separate tags'
                  />
                )
              }}
            />
            <TextField
              id='datetime-local'
              label='Set Date'
              type='date'
              fullWidth
              margin='dense'
              defaultValue={new Date().toLocaleDateString('en-CA')}
              InputLabelProps={{
                shrink: true
              }}
            />
            <Button
              variant='outlined'
              color='secondary'
              className={classes.addBtn}
              type='submit'
              disabled={!task || error}
              fullWidth
            >
              Add
            </Button>
          </form>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default NewTodo
