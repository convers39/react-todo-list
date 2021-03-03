import React, { useContext } from 'react'
import { Redirect, Link as RouterLink, useLocation } from 'react-router-dom'
import {
  TextField,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Button
} from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { firebaseAuth } from '../firebase/config'
import { AuthContext } from './Auth'

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
    input: {
      padding: '0 1em'
    },
    actions: {
      display: 'block',
      textAlign: 'center',
      marginBottom: theme.spacing(2)
    }
  })
)

const Login = () => {
  const classes = useStyles()
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)

  const onSubmit = (e) => {
    e && e.preventDefault()
    const { email, password } = e.target.elements
    firebaseAuth
      .signInWithEmailAndPassword(email.value, password.value)
      .then((data) => {
        setIsLoggedIn(true)
        console.log('login page', data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // const { state } = useLocation()
  if (isLoggedIn) {
    return <Redirect to='/' />
  }
  return (
    <div className='login'>
      <form
        className={classes.container}
        noValidate
        autoComplete='off'
        onSubmit={onSubmit}
      >
        <Card className={classes.card}>
          <CardHeader className={classes.header} title='Login' />
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
              Log in
            </Button>
            <Button
              variant='outlined'
              size='large'
              color='primary'
              component={RouterLink}
              to='/register'
            >
              Sign up
            </Button>
          </CardActions>
        </Card>
      </form>
    </div>
  )
}

export default Login
