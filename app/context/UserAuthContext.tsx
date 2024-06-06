'use client'
import { useEffect, createContext, useState, use } from 'react'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { app } from '@/app/lib/firebaseConfig'
import { Firestore } from '@/app/lib/services/Firestore'
import { useRouter } from 'next/navigation'

const UserContext = createContext()

export const UserAuthProvider = ({ children }) => {
  const auth = getAuth(app)
  const router = useRouter()
  const [authExercises, setAuthExercises] = useState()
  const [user, setUser] = useState(!auth.currentUser ? { user: auth.currentUser } : null)

  useEffect(() => {
    onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        await setUser(authUser)
        Firestore.readExercises(authUser).then((exercises) => {
          setAuthExercises(exercises)
        })
        console.log('User is logged in:', authUser.uid)
      } else {
        setUser(null)
        setAuthExercises(null)
        signOut(auth)
          .then(() => {
            // Sign-out successful.
            router.push('/login')
            // setUserLoggedIn(false)
            console.log('You have been signed out')
          })
          .catch((error) => {
            // An error happened.
            console.log(error)
          })
      }
    })
  }, [auth, router])

  useEffect(() => {}, [authExercises])

  return <UserContext.Provider value={{ user, authExercises, setAuthExercises }}>{children}</UserContext.Provider>
}
export default UserContext
