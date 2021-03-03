import React, { useContext } from 'react'
import { AuthContext } from './Auth'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = (props) => {
  const { isLoggedIn } = useContext(AuthContext)
  console.log('private', isLoggedIn, props)
  // if (isLoggedIn) {
  //   return (
  //     <Route exact path={props.path}>
  //       {props.children}
  //     </Route>
  //   )
  // } else {
  //   return <Redirect to={props.redirectTo} />
  // }
  return (
    <Route
      exact
      render={() => {
        return isLoggedIn ? props.children : <Redirect to='/login' />
      }}
    />
  )
}

export default PrivateRoute
