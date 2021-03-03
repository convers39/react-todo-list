import React from 'react'
import { Button, ButtonGroup } from '@material-ui/core'
import SortIcon from '@material-ui/icons/Sort'
import { useDispatch } from 'react-redux'
import { useAuth } from '../contexts/Auth'
import { sortTodo } from '../actions/todo-action'

const Sorting = ({ listName }) => {
  const style = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: '0.5em 0'
  }

  const { uid } = useAuth()
  const dispatch = useDispatch()

  const onSort = (sorting) => {
    dispatch(sortTodo(uid, sorting, listName))
  }

  return (
    <div style={style}>
      <SortIcon />
      <ButtonGroup variant='contained' color='primary'>
        <Button onClick={() => onSort('ASC')}>by created</Button>
        <Button onClick={() => onSort('DEC')}>by latest</Button>
      </ButtonGroup>
    </div>
  )
}

export default Sorting
