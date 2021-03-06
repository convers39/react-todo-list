import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { CssBaseline, Container } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import './App.scss'
import ListBoard from './components/ListBoard'
import Header from './components/Header'
import Register from './components/Register'
import Login from './components/Login'
import Profile from './components/Profile'
import { theme } from './styles/mui-theme'

import { AuthProvider } from './contexts/Auth'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Router>
            <Header />
            <Container maxWidth='xs'>
              <Switch>
                <PrivateRoute exact path='/' component={ListBoard} />
                <PrivateRoute exact path='/profile' component={Profile} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
              </Switch>
            </Container>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </div>
  )
}

export default App
