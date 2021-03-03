import React, { createContext, useState, useEffect } from 'react'
import { firebaseAuth } from '../firebase/config'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [uid, setUid] = useState(null)

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        console.log('authentication', user.uid)
        setUid(user.uid)
        setIsLoggedIn(true)
      }
    })
  }, [])

  return (
    <div>
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, uid }}>
        {children}
      </AuthContext.Provider>
    </div>
  )
}
