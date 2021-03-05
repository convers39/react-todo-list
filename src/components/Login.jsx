import React, { useState } from 'react'
import { Redirect, Link as RouterLink, useHistory } from 'react-router-dom'
import {
  TextField,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Button
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
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
  const { logIn, currentUser, setCurrentUser } = useAuth()
  const history = useHistory()
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: ''
  })
  const [authError, setAuthError] = useState({ msg: '' })
  const [submitting, setSubmitting] = useState(false)

  const resetError = (e) => {
    const { name } = e.target
    setAuthError({ msg: '' })
    setFormErrors({ ...formErrors, [name]: '' })
  }

  const validateInput = (e) => {
    const { name, value } = e.target
    const errors = { ...formErrors }
    switch (name) {
      case 'email':
        const emailRe = /^([a-zA-Z0-9_.-]+@[\da-zA-Z.-]+\.[a-zA-Z.]{2,6})$/
        errors[name] = emailRe.test(value) ? '' : 'Invalid email address'
        break
      case 'password':
        const passwordRe = /(?=.*\d)(?=.*[a-z]|[A-Z]).{6,20}/
        errors[name] = passwordRe.test(value)
          ? ''
          : 'At least 6 characters including digits and characters'
        break
      default:
        break
    }
    formErrors !== errors && setFormErrors(errors)
  }

  const handleLogIn = (e) => {
    e.preventDefault()
    setSubmitting(true)
    const { email, password } = e.target.elements
    logIn(email.value, password.value)
      .then((user) => {
        setCurrentUser(user)
        console.log('login page user', user)
        history.push('/')
      })
      .catch((err) => {
        console.log(err)
        setSubmitting(false)
        setAuthError({ msg: err.message })
      })
  }

  // const { state } = useLocation()
  if (currentUser) {
    return <Redirect to='/' />
  }
  return (
    <div className='login'>
      <form
        className={classes.container}
        noValidate
        autoComplete='off'
        onSubmit={handleLogIn}
      >
        <Card className={classes.card}>
          <CardHeader className={classes.header} title='Login' />
          {authError.msg && <Alert severity='error'>{authError.msg}</Alert>}
          <CardContent>
            <TextField
              fullWidth
              id='email'
              name='email'
              type='email'
              label='Email'
              placeholder='Email'
              margin='normal'
              onFocus={resetError}
              onBlur={validateInput}
              error={!!formErrors.email}
              helperText={formErrors.email}
            />
            <TextField
              fullWidth
              id='password'
              name='password'
              type='password'
              label='Password'
              placeholder='Password includes 6-20 characters and numbers'
              margin='normal'
              onFocus={resetError}
              onBlur={validateInput}
              error={!!formErrors.password}
              helperText={formErrors.password}
            />
          </CardContent>
          <CardActions className={classes.actions}>
            <Button
              variant='contained'
              size='large'
              color='primary'
              type='submit'
              disabled={
                !!formErrors.email || !!formErrors.password || submitting
              }
            >
              Log in
            </Button>
            <Button
              variant='outlined'
              size='large'
              color='primary'
              disabled={submitting}
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
