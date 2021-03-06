import { db } from '../firebase/config'

export const fetchTags = (uid) => {
  return (dispatch, getState) => {
    db.ref(`all_tags/${uid}`).on('value', (tags) => {
      console.log('fetch remote tags', tags.val())
      dispatch({ type: 'FETCH_TAGS', payload: { remoteTags: tags.val() } })
    })
  }
}

export const addTags = (uid, tags) => {
  return async (dispatch, getState) => {
    // update remote tag list
    const remoteTags = getState().remoteTags
    console.log('in add tags action get state', remoteTags)
    const newTags = tags.filter((t) => !remoteTags.includes(t))
    const newTagList = [...remoteTags, ...newTags]
    console.log('add new tag list', remoteTags, newTags)
    try {
      await db.ref(`all_tags/${uid}`).set(newTagList)
      dispatch({ type: 'ADD_TAGS', payload: { newTagList } })
    } catch (error) {
      console.log(error)
    }
  }
}
