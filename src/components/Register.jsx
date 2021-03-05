import React, { useState } from 'react'
import { Redirect, Link as RouterLink, useHistory } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
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
  const { clearErrors, register, handleSubmit, errors, getValues } = useForm({
    mode: 'onBlur'
  })
  const [authError, setAuthError] = useState('')
  // const password = useRef({})
  // password.current = watch('password', '')

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

  if (currentUser) {
    return <Redirect to='/' />
  }
  console.log('errors', errors)
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
              margin='normal'
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
            {/* <Controller
              name='email'
              control={control}
              defaultValue=''
              rules={{
                required: { value: true, message: 'This field is required' },
                pattern: {
                  value: /^([a-zA-Z0-9_.-]+@[\da-zA-Z.-]+\.[a-zA-Z.]{2,6})$/,
                  message: 'Invalid email address'
                }
              }}
              as={
                <TextField
                  fullWidth
                  id='email'
                  type='email'
                  // name='email'
                  label='Email'
                  placeholder='Email'
                  margin='normal'
                  onFocus={() => clearErrors('email')}
                  // inputRef={register({

                  // })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              }
            /> */}
            <TextField
              fullWidth
              id='password'
              name='password'
              type='password'
              label='Password'
              placeholder='Password'
              margin='normal'
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
              margin='normal'
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
              color='primary'
              type='submit'
              disabled={!!Object.keys(errors).length || !!authError.msg}
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
