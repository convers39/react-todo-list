import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Button, TextField, Box } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'

// import { Formik, Field } from 'formik'
// import { Autocomplete } from 'formik-material-ui-lab'

import { db } from '../firebase/config'
import { filterTags } from '../actions/todo-action'
import { useAuth } from '../contexts/Auth'

const Tags = () => {
  const [tagList, setTagList] = useState([])
  const [remoteTags, setRemoteTags] = useState([])
  const dispatch = useDispatch()
  const { uid } = useAuth()

  useEffect(() => {
    db.ref(`all_tags/${uid}`)
      .get()
      .then((tags) => {
        console.log('tags', tags.val())
        setRemoteTags(tags.val())
      })
  }, [uid])

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

  const setNewTags = (tags) => {
    console.log('setNewTags', tags)
    setTagList(tags)
  }

  // const pushToTagList = (e) => {
  //   const tag = e.target.value
  //   if (e.key === 'Enter' && tag) {
  //     e.target.value = ''
  //     setTagList([...tagList, tag])
  //   }
  // }

  // const removeFromTagList = (tag) => {
  //   const copy = [...tagList].filter((item) => item !== tag)
  //   setTagList(copy)
  // }

  // const resetFilter = () => {
  //   setTagList([])
  // }

  const style = {
    backgroundColor: '#eee',
    padding: '1.5em 3em',
    margin: '.5em auto'
  }

  return (
    <div style={style}>
      {/* <Formik initialVars={{ autoComplete: [] }}>
        {() => (
          <Box margin={1}>
            <Field
              name='autocomplete'
              multiple
              component={Autocomplete}
              options={tagList}
              getOptionLabel={(tag) => tag}
              style={{ width: '80%' }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  // error={touched['autocomplete'] && !!errors['autocomplete']}
                  // helperText={touched['autocomplete'] && errors['autocomplete']}
                  label='Autocomplete'
                  variant='outlined'
                />
              )}
            />
          </Box>
        )}
      </Formik> */}
      <Autocomplete
        multiple
        id='tags-standard'
        options={remoteTags || []}
        getOptionLabel={(option) => option}
        defaultValue={[]}
        style={{ margin: '.5em auto' }}
        onChange={(e, newTags) => setNewTags(newTags)}
        renderInput={(params) => (
          <TextField
            {...params}
            variant='standard'
            label='Todo Tags'
            placeholder='Tags'
          />
        )}
      />
      {/* <TextField
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
      </div>*/}
    </div>
  )
}

export default Tags
