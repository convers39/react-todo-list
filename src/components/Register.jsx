import React, { useState, useEffect } from 'react'
import { Redirect, Link as RouterLink, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
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

const Register = () => {
  const classes = useStyles()
  const { signUp, currentUser } = useAuth()
  const history = useHistory()
  const { clearErrors, register, handleSubmit, errors, getValues } = useForm({
    mode: 'onBlur'
  })
  const [authError, setAuthError] = useState('')

  const handleSignUp = (data) => {
    console.log('sign up data', data)
    const { email, password } = data

    signUp(email, password)
      .then((data) => {
        history.push('/login')
        console.log(data)
      })
      .catch((err) => {
        setAuthError({ msg: err.message })
      })
  }

  const resetError = (e) => {
    const { name } = e.target
    setAuthError({ msg: '' })
    clearErrors(name)
  }

  useEffect(() => {
    if (currentUser) {
      return <Redirect to='/' />
    }
  })

  return (
    <div className='login'>
      <form
        className={classes.container}
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit(handleSignUp)}
      >
        <Card className={classes.card}>
          <CardHeader className={classes.header} title='Sign Up' />
          {authError.msg && <Alert severity='error'>{authError.msg}</Alert>}
          <CardContent>
            <TextField
              fullWidth
              id='email'
              type='email'
              name='email'
              label='Email'
              placeholder='Email'
              margin='dense'
              onFocus={resetError}
              inputRef={register({
                required: { value: true, message: 'This field is required' },
                pattern: {
                  value: /^([a-zA-Z0-9_.-]+@[\da-zA-Z.-]+\.[a-zA-Z.]{2,6})$/,
                  message: 'Invalid email address'
                }
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              fullWidth
              id='password'
              name='password'
              type='password'
              label='Password'
              placeholder='Password'
              margin='dense'
              onFocus={resetError}
              error={!!errors.password}
              inputRef={register({
                pattern: {
                  value: /(?=.*\d)(?=.*[a-z]|[A-Z]).{6,20}/,
                  message:
                    'Password must be at least 6 characters including digits and characters'
                },
                required: { value: true, message: 'This field is required' }
              })}
              helperText={errors.password?.message}
            />
            <TextField
              fullWidth
              id='passwordConfirm'
              name='passwordConfirm'
              type='password'
              label='Password Confirm'
              placeholder='Password Confirm'
              margin='dense'
              onFocus={resetError}
              inputRef={register({
                required: { value: true, message: 'This field is required' },
                validate: (value) =>
                  value === getValues('password') || 'The passwords must match'
              })}
              error={!!errors.passwordConfirm}
              helperText={errors.passwordConfirm?.message}
            />
          </CardContent>
          <CardActions className={classes.actions}>
            <Button
              variant='contained'
              size='large'
              color='secondary'
              type='submit'
              disabled={!!Object.keys(errors).length || !!authError.msg}
            >
              Sign up
            </Button>
            <Button
              variant='outlined'
              size='large'
              color='secondary'
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
