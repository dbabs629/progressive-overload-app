'use client'
import { useEffect, createContext, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { app } from '@/app/lib/firebaseConfig'

const UserContext = createContext()

export const UserAuthProvider = ({ children }) => {
  const auth = getAuth(app)

  const [user, setUser] = useState(!auth.currentUser ? { user: auth.currentUser } : null)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        console.log('User is logged in:', user)
      } else {
        setUser(null)
        console.log('No User')
      }
    })
  }, [auth])

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
}
export default UserContext
