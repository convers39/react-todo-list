import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { firebaseAuth } from '../firebase/config'
import { AuthContext } from './Auth'
import {
  Button,
  AppBar,
  Toolbar,
  Typography,
  IconButton
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)

  const handleLogOut = (e) => {
    e.preventDefault()
    firebaseAuth
      .signOut()
      .then(() => setIsLoggedIn(false))
      .catch(console.error)
  }

  const style = { display: 'flex', justifyContent: 'space-between' }

  return (
    <header className='header'>
      <AppBar position='static'>
        <Toolbar style={style}>
          <IconButton edge='start' color='inherit' aria-label='menu'>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6'>Todo List</Typography>
          <div>
            {isLoggedIn ? (
              <Button onClick={handleLogOut}>
                <ExitToAppIcon style={{ color: 'white' }} />
              </Button>
            ) : (
              <Redirect to='/login' />
            )}
          </div>
        </Toolbar>
      </AppBar>
    </header>
  )
}

export default Header
