import React from 'react'
import { Redirect, Link as RouterLink, useHistory } from 'react-router-dom'
import {
  TextField,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Button
} from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'

import { useAuth } from '../contexts/Auth'

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 400,
      margin: `${theme.spacing(0)} auto`
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1
    },
    header: {
      textAlign: 'center',
      background: '#3F51B5',
      color: '#fff'
    },
    card: {
      marginTop: theme.spacing(10)
    },
    actions: {
      display: 'block',
      textAlign: 'center',
      marginBottom: theme.spacing(2)
    }
  })
)

const Register = () => {
  const classes = useStyles()
  const { signUp, currentUser } = useAuth()
  const history = useHistory()

  const handleSignUp = (e) => {
    e.preventDefault()
    const { email, password } = e.target.elements
    signUp(email.value, password.value)
      .then((data) => {
        history.push('/login')
        console.log(data)
      })
      .catch(console.error)
  }

  if (currentUser) {
    return <Redirect to='/' />
  }

  return (
    <div className='login'>
      <form
        className={classes.container}
        noValidate
        autoComplete='off'
        onSubmit={handleSignUp}
      >
        <Card className={classes.card}>
          <CardHeader className={classes.header} title='Sign Up' />
          <CardContent>
            <TextField
              // error={state.isError}
              fullWidth
              id='email'
              type='email'
              label='Email'
              placeholder='Email'
              margin='normal'
            />
            <TextField
              // error={state.isError}
              fullWidth
              id='password'
              type='password'
              label='Password'
              placeholder='Password'
              margin='normal'
            />
          </CardContent>
          <CardActions className={classes.actions}>
            <Button
              variant='contained'
              size='large'
              color='primary'
              type='submit'
            >
              Sign up
            </Button>
            <Button
              variant='outlined'
              size='large'
              color='primary'
              component={RouterLink}
              to='/login'
            >
              Login
            </Button>
          </CardActions>
        </Card>
      </form>
    </div>
  )
}

export default Register
