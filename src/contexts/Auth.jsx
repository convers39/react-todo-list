import React, { createContext, useState, useEffect, useContext } from 'react'
import { firebaseAuth as auth } from '../firebase/config'

export const AuthContext = createContext()
export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  // const [loading, setLoading] = useState(true)

  const logIn = (email, password) =>
    auth.signInWithEmailAndPassword(email, password)

  const logOut = () => auth.signOut()

  const signUp = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password)

  const resetPassword = (email) => auth.sendPasswordResetEmail(email)

  const updateEmail = (email) => currentUser.updateEmail(email)

  const updatePassword = (password) => currentUser.updatePassword(password)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user)
        // setLoading(false)
      }
    })
    return unsubscribe
  }, [])

  const value = {
    uid: currentUser ? currentUser.uid : null,
    currentUser,
    setCurrentUser,
    logIn,
    signUp,
    logOut,
    resetPassword,
    updatePassword,
    updateEmail
  }

  return (
    <div>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </div>
  )
}
