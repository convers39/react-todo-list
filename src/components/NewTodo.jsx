import React, { useState, useContext } from 'react'
import { Button, TextField } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'

import { AuthContext } from './Auth'
import { addTodo } from '../actions/todo-action'

const NewTodo = () => {
  const [task, setTask] = useState('')
  const [error, setError] = useState(false)

  const { uid } = useContext(AuthContext)
  const dispatch = useDispatch()

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
    let listName
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

    // add tags
    let tags = []
    if (taskText.includes('#')) {
      const re = /^#\w+$/
      tags = taskText.split(' ').filter((w) => w.match(re))
      tags = tags.map((tag) => tag.replace('#', ''))
      taskText = taskText
        .split(' ')
        .filter((w) => !w.startsWith('#'))
        .join(' ')
    }
    console.log('check new todo args', taskText, date, tags)
    setTask('')
    // addTodo(taskText, listName, date, tags);
    dispatch(addTodo(uid, listName, taskText, date, tags))
  }

  const style = {
    padding: '1em 1em',
    margin: '0 2em',
    display: 'flex',
    // flexWrap: "wrap",
    alignItems: 'baseline',
    justifyContent: 'space-between'
  }

  return (
    <div className='new-task' style={{ border: '1px solid #3F51B5' }}>
      <form
        style={style}
        noValidate
        autoComplete='off'
        onSubmit={onSubmit}
      >
        <TextField
          id='standard-basic'
          label='New Todo'
          required
          onChange={onTask}
          value={task}
          error={error}
          helperText={error ? 'Use space between each words' : ''}
          style={{ width: '50%' }}
          placeholder="e.g. '@list task' to create or add to a list"
        />
        <TextField
          id='datetime-local'
          label='Set Date'
          type='date'
          defaultValue={new Date().toLocaleDateString('en-CA')}
          InputLabelProps={{
					  shrink: true
          }}
        />
        <Button
          variant='outlined'
          color='primary'
          type='submit'
          disabled={!task || error}
          style={{ marginLeft: 30 }}
        >
          Add
        </Button>
      </form>
    </div>
  )
}

export default NewTodo
