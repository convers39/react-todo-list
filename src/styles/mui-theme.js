import { createMuiTheme } from '@material-ui/core/styles'
import { createStyles, makeStyles } from '@material-ui/core/styles'
export const theme = createMuiTheme({
  typography: {
    fontFamily: ['"Nunito"', '"Segoe UI"', '"Helvetica Neue"'].join(',')
  },
  palette: {
    primary: {
      main: '#567572FF',
      dark: '#0063B2FF'
    },
    secondary: {
      sub: '#9CC3D5FF',
      main: '#964F4CFF'
    },
    warning: {
      main: '#696667FF'
    },
    error: {
      main: '#e57373'
    }
  },
  overrides: {
    MuiAccordion: {
      root: {
        backgroundColor: '#eee'
      }
    }
  }
})

export const loginStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 300,
      margin: `${theme.spacing(0)} auto`
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1
    },
    header: {
      textAlign: 'center',
      background: theme.palette.primary.main,
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
    },
    buttons: {
      background: theme.palette.secondary
    }
  })
)

export const headerStyles = makeStyles((theme) =>
  createStyles({
    header: {
      textAlign: 'center',
      background: theme.palette.primary.main,
      color: '#fff',
      marginBottom: '1rem'
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    accountBtn: {
      justifySelf: 'flex-start'
    },
    logoutBtn: {
      justifySelf: 'flex-end'
    },
    icons: {
      color: '#fff'
    }
  })
)

export const newTodoStyles = makeStyles((theme) =>
  createStyles({
    container: {
      border: '1px solid',
      borderColor: theme.palette.primary.main,
      borderRadius: 5
    },
    form: {
      padding: '.5rem',
      margin: '.4rem',
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    summary: {
      margin: '.4rem'
    },
    taskInput: {},
    tags: {},
    date: {},
    addBtn: {
      marginTop: '1rem'
    }
  })
)

export const filterStyles = makeStyles((theme) =>
  createStyles({
    container: {
      backgroundColor: '#eee',
      padding: '.5rem 1rem',
      margin: '.5rem auto',
      borderRadius: 5
    },
    input: { margin: '.5em auto' },
    icons: {
      color: '#fff'
    }
  })
)

export const listStyles = makeStyles((theme) =>
  createStyles({
    container: {
      paddingBottom: '.5rem',
      borderRadius: '5px',
      width: '100%',
      '&:last-child': {
        paddingBottom: 0
      }
    },
    input: { margin: '.5em auto' },
    icons: {
      color: '#fff'
    }
  })
)

export const todoStyles = makeStyles((theme) =>
  createStyles({
    container: {
      margin: '.2rem .4rem',
      // padding: '.2rem 0',
      borderRadius: '5px',
      backgroundColor: '#87b4b8'
    }
  })
)

export const listBoardStyles = makeStyles((theme) =>
  createStyles({
    container: {
      // backgroundColor: '#eee'
    },
    board: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      border: '1px solid',
      borderColor: theme.palette.primary.main,
      borderRadius: 5,
      height: '100%',
      marginBottom: '2rem'
    }
  })
)
