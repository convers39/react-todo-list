import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { CssBaseline, Container } from '@material-ui/core'

import './App.scss'
import ListBoard from './components/ListBoard'
import Header from './components/Header'
import Register from './components/Register'
import Login from './components/Login'

import { AuthProvider } from './components/Auth'

function App () {
  return (
    <div className='App'>
      <CssBaseline />
      <Container maxWidth='md'>
        {/* <Typography
					component="div"
					style={{ backgroundColor: "#cfe8fc", height: "100vh" }}
				/> */}
        <AuthProvider>
          <Router>
            <Header />
            <Switch>
              <Route exact path='/' component={ListBoard} />
              <Route exact path='/login' component={Login} />
              <Route
                exact
                path='/register'
                component={Register}
              />
            </Switch>
          </Router>
        </AuthProvider>
      </Container>
    </div>
  )
}

export default App
