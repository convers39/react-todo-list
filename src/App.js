import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { CssBaseline, Container } from '@material-ui/core'

import './App.scss'
import ListBoard from './components/ListBoard'
import Header from './components/Header'
import Register from './components/Register'
import Login from './components/Login'
import Profile from './components/Profile'

import { AuthProvider } from './contexts/Auth'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <div className='App'>
      <CssBaseline />
      <Container maxWidth='md'>
        <AuthProvider>
          <Router>
            <Header />
            <Switch>
              <PrivateRoute exact path='/' component={ListBoard} />
              <PrivateRoute exact path='/profile' component={Profile} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
            </Switch>
          </Router>
        </AuthProvider>
      </Container>
    </div>
  )
}

export default App
