import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'

import { useAuth } from '../contexts/Auth'
import { addTodo } from '../actions/todo-action'
import { addTags } from '../actions/tag-action'

const NewTodo = () => {
  const [task, setTask] = useState('')
  const [error, setError] = useState(false)
  const [tags, setTags] = useState([]) // local tags for new todo

  const { uid } = useAuth()
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
          console.log('new tag list on key down', tags)
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

    // add tags, replaced with autoComplete and keydown to add new tags
    // let tags = []
    // if (taskText.includes('#')) {
    //   const re = /^#\w+$/
    //   tags = taskText.split(' ').filter((w) => w.match(re))
    //   tags = tags.map((tag) => tag.replace('#', ''))
    //   taskText = taskText
    //     .split(' ')
    //     .filter((w) => !w.startsWith('#'))
    //     .join(' ')
    // }

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

  const style = {
    padding: '1em 1em',
    margin: '0 2em',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between'
  }

  return (
    <div className='new-task' style={{ border: '1px solid #3F51B5' }}>
      <form style={style} onSubmit={onSubmit}>
        <TextField
          id='standard-basic'
          label='New Todo'
          required
          onChange={onTask}
          value={task}
          error={error}
          helperText={error ? 'Use space between each words' : ''}
          style={{ width: '100%' }}
          placeholder="e.g. '@list task' to create or add to a list"
        />

        <TextField
          id='datetime-local'
          label='Set Date'
          type='date'
          style={{ width: '25%' }}
          defaultValue={new Date().toLocaleDateString('en-CA')}
          InputLabelProps={{
            shrink: true
          }}
        />
        <Autocomplete
          multiple
          freeSolo
          style={{ width: '60%' }}
          id='tags-outlined'
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
                variant='outlined'
                label='Add Tags to Todo'
                placeholder='Press either space, enter or comma to separate tags'
                margin='normal'
              />
            )
          }}
        />
        <Button
          variant='outlined'
          color='primary'
          type='submit'
          disabled={!task || error}
          style={{ width: '10%' }}
        >
          Add
        </Button>
      </form>
    </div>
  )
}

export default NewTodo
