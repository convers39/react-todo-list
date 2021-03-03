import React from 'react'
import { Link as RouterLink, useHistory } from 'react-router-dom'

import { useAuth } from '../contexts/Auth'
import {
  Button,
  AppBar,
  Toolbar,
  Typography,
  IconButton
} from '@material-ui/core'
// import MenuIcon from '@material-ui/icons/Menu'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

const Header = () => {
  const { currentUser, logOut } = useAuth()
  const history = useHistory()
  const handleLogOut = (e) => {
    e.preventDefault()
    logOut()
      .then(() => history.push('/login'))
      .catch(console.error)
  }

  const style = { display: 'flex', justifyContent: 'space-between' }

  return (
    <header className='header'>
      <AppBar position='static'>
        <Toolbar style={style}>
          <IconButton edge='start' color='inherit' aria-label='menu'>
            {currentUser && (
              <Button component={RouterLink} to='/profile'>
                <AccountBoxIcon style={{ color: 'white' }} />
              </Button>
            )}
          </IconButton>
          <Typography variant='h6'>Todo List</Typography>
          <div>
            {currentUser && (
              <Button onClick={handleLogOut}>
                <ExitToAppIcon style={{ color: 'white' }} />
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </header>
  )
}

export default Header
