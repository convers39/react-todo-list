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
  const {
    clearErrors,
    // register,
    handleSubmit,
    errors,
    getValues,
    control
  } = useForm()
  const [authError, setAuthError] = useState('')
  // const password = useRef({})
  // password.current = watch('password', '')

  const handleSignUp = (e) => {
    e.preventDefault()
    const { email, password } = e.target.elements

    signUp(email.value, password.value)
      .then((data) => {
        history.push('/login')
        console.log(data)
      })
      .catch((err) => {
        setAuthError({ msg: err.message })
      })
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
            <Controller
              name='email'
              control={control}
              defaultValue=''
              rules={{
                required: true,
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
                  error={errors.email}
                  helperText={errors.email?.message}
                />
              }
            />
            <Controller
              name='password'
              control={control}
              defaultValue=''
              rules={{
                pattern: {
                  value: /(?=.*\d)(?=.*[a-z]|[A-Z]).{6,20}/,
                  message:
                    'Password must be at least 6 characters including digits and characters'
                },
                required: true
              }}
              as={
                <TextField
                  fullWidth
                  id='password'
                  // name='password'
                  type='password'
                  label='Password'
                  placeholder='Password'
                  margin='normal'
                  onFocus={() => clearErrors('password')}
                  error={errors.password}
                  // inputRef={register({

                  // })}
                  helperText={errors.password?.message}
                />
              }
            />
            <Controller
              name='passwordConfirm'
              control={control}
              defaultValue=''
              rules={{
                required: true,
                validate: (value) =>
                  value === getValues('password') || 'The passwords must match'
              }}
              as={
                <TextField
                  fullWidth
                  id='passwordConfirm'
                  // name='passwordConfirm'
                  type='password'
                  label='Password Confirm'
                  placeholder='Password Confirm'
                  margin='normal'
                  onFocus={() => clearErrors('passwordConfirm')}
                  // inputRef={register({
                  // })}
                  error={errors.passwordConfirm}
                  helperText={errors.passwordConfirm?.message}
                />
              }
            />
          </CardContent>
          <CardActions className={classes.actions}>
            <Button
              variant='contained'
              size='large'
              color='primary'
              type='submit'
              disabled={!!Object.keys(errors).length}
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
