import React from 'react'
import { Link as RouterLink, useHistory, Redirect } from 'react-router-dom'

import {
  Button,
  AppBar,
  Toolbar,
  Typography,
  IconButton
} from '@material-ui/core'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { headerStyles as useStyles } from '../styles/mui-theme'

import { useAuth } from '../contexts/Auth'

const Header = () => {
  const { currentUser, logOut } = useAuth()
  const classes = useStyles()
  const history = useHistory()

  const handleLogOut = async () => {
    try {
      await logOut()
      history.push('/login')
    } catch {
      console.log('Failed to log out')
    }
  }

  return (
    <header className={classes.header}>
      <AppBar position='static'>
        <Toolbar className={classes.toolbar}>
          {currentUser ? (
            <Button
              className={classes.accountBtn}
              component={RouterLink}
              to='/profile'
            >
              <AccountBoxIcon className={classes.icons} />
            </Button>
          ) : (
            <p></p>
          )}
          <Typography variant='h5' align='center'>
            Todo List
          </Typography>
          {currentUser ? (
            <Button className={classes.logoutBtn} onClick={handleLogOut}>
              <ExitToAppIcon className={classes.icons} />
            </Button>
          ) : (
            <p></p>
          )}
        </Toolbar>
      </AppBar>
    </header>
  )
}

export default Header
