import React, { useState, useEffect } from 'react'
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
import { useAuth } from '../contexts/Auth'
import { loginStyles as useStyles } from '../styles/mui-theme'

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

  useEffect(() => {
    if (currentUser) {
      return <Redirect to='/' />
    }
  }, [currentUser])
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
              color='secondary'
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
              color='secondary'
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
