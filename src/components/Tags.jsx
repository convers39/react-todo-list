import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'

// import { Formik, Field } from 'formik'
// import { Autocomplete } from 'formik-material-ui-lab'

import { db } from '../firebase/config'
import { filterTags } from '../actions/todo-action'
import { fetchTags } from '../actions/tag-action'
import { useAuth } from '../contexts/Auth'

import { filterStyles as useStyles } from '../styles/mui-theme'

const Tags = () => {
  const [tagList, setTagList] = useState([])
  const remoteTags = useSelector((state) => state.remoteTags)
  const dispatch = useDispatch()
  const { uid } = useAuth()
  const classes = useStyles()

  useEffect(() => {
    dispatch(fetchTags(uid))
  }, [uid])

  useEffect(() => {
    const initials = {}
    db.ref(`all_lists/${uid}`).on('value', (snapshot) => {
      snapshot.forEach((snap) => {
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

  return (
    <div className={classes.container}>
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
        fullWidth
        className={classes.input}
        options={remoteTags || []}
        getOptionLabel={(option) => option}
        defaultValue={[]}
        onChange={(e, newTags) => setNewTags(newTags)}
        renderInput={(params) => (
          <TextField
            {...params}
            variant='standard'
            label='Filter by Tags'
            placeholder='Tags'
          />
        )}
      />
    </div>
  )
}

export default Tags
