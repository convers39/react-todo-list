const FETCH_TAGS = 'FETCH_TAGS'
const ADD_TAGS = 'ADD_TAGS'

const tagsReducer = (state = [], action) => {
  const { type, payload } = action
  switch (type) {
    case FETCH_TAGS:
      console.log('tag reducer', payload.remoteTags)
      return payload.remoteTags
    case ADD_TAGS:
      return payload.newTagList
    default:
      console.log('default tag reducer', state)
      return state
  }
}

export default tagsReducer
