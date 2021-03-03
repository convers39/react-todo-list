import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Button, TextField } from '@material-ui/core'

import { db } from '../firebase/config'
import { filterTags } from '../actions/todo-action'
import { useAuth } from '../contexts/Auth'

const Tags = () => {
  const [tagList, setTagList] = useState([])
  const dispatch = useDispatch()
  const { uid } = useAuth()

  useEffect(() => {
    const initials = {}
    db.ref(`all_lists/${uid}`).on('value', (snapshot) => {
      snapshot.forEach((snap) => {
        console.log(snap.val())
        const { name, todos } = snap.val()
        if (todos && name !== 'deleted') {
          initials[name] = snap.val()
        }
      })
      dispatch(filterTags(tagList, initials))
      // console.log("tags dispatched", initials);
    })
  }, [tagList.length, uid, dispatch])

  const pushToTagList = (e) => {
    const tag = e.target.value
    if (e.key === 'Enter' && tag) {
      e.target.value = ''
      setTagList([...tagList, tag])
    }
  }

  const removeFromTagList = (tag) => {
    const copy = [...tagList].filter((item) => item !== tag)
    setTagList(copy)
  }

  const resetFilter = () => {
    setTagList([])
  }

  const style = {
    backgroundColor: '#eee',
    padding: '1.5em 3em',
    margin: '.5em auto'
  }

  return (
    <div style={style}>
      <TextField
        onKeyDown={pushToTagList}
        id='standard-full-width'
        label='Tag Filter'
        style={{ margin: '.5em auto' }}
        placeholder='Press enter to input a tag, click tag to remove'
        // helperText={tagList.length ? "Click tag to remove" : ""}
        fullWidth
        margin='normal'
        InputLabelProps={{
          shrink: true
        }}
      />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Button
          variant='outlined'
          color='secondary'
          onClick={resetFilter}
          disabled={!tagList.length}
          disableElevation
          style={{ marginRight: '.5em' }}
        >
          Reset
        </Button>
        {tagList.length ? (
          tagList.map((tag) => (
            <Button
              color='primary'
              onClick={() => removeFromTagList(tag)}
              key={tag}
              style={{ margin: '0 .5em' }}
            >
              #{tag}
            </Button>
          ))
        ) : (
          <p style={{ margin: '0 .5em' }}>No tags</p>
        )}
      </div>
    </div>
  )
}

export default Tags
