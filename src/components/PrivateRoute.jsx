import React from 'react'
import { useAuth } from '../contexts/Auth'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth()
  console.log('private', currentUser)
  // if (currentUser) {
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
      {...rest}
      render={(props) => {
        return currentUser ? <Component {...props} /> : <Redirect to='/login' />
      }}
    />
  )
}

export default PrivateRoute
