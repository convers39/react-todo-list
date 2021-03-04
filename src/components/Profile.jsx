import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/Auth'
import { Link as RouterLink, useHistory } from 'react-router-dom'
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

const Profile = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const classes = useStyles()
  const history = useHistory()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { currentUser, updateEmail, updatePassword } = useAuth()

  const handleUpdate = (e) => {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match')
    }

    const promises = []
    setLoading(true)
    setError('')

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        history.push('/')
      })
      .catch(() => {
        setError('Failed to update account')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className='Profile'>
      <form
        className={classes.container}
        noValidate
        autoComplete='off'
        onSubmit={handleUpdate}
      >
        <Card className={classes.card}>
          <CardHeader className={classes.header} title='Profile' />
          {error && <Alert severity='error'>{error}</Alert>}
          <CardContent>
            <TextField
              // error={state.isError}
              fullWidth
              id='email'
              type='email'
              label='Email'
              ref={emailRef}
              placeholder='New Email'
              defaultValue={currentUser.email}
              margin='normal'
            />
            <TextField
              // error={state.isError}
              fullWidth
              id='password'
              ref={passwordRef}
              type='password'
              label='Password'
              placeholder='Leave blank if no need update'
              margin='normal'
            />
            <TextField
              // error={state.isError}
              fullWidth
              id='passwordConfirm'
              type='passwordConfirm'
              ref={passwordConfirmRef}
              label='Password Confirm'
              placeholder='Leave blank if no need update'
              margin='normal'
            />
          </CardContent>
          <CardActions className={classes.actions}>
            <Button
              variant='contained'
              // fullWidth='true'
              size='large'
              color='primary'
              type='submit'
              disabled={loading}
            >
              Update
            </Button>
            <Button
              variant='outlined'
              size='large'
              color='primary'
              component={RouterLink}
              to='/'
            >
              Cancel
            </Button>
          </CardActions>
        </Card>
      </form>
      <div></div>
    </div>
  )
}

export default Profile
