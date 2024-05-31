'use client'
import { useState, useEffect, useContext } from 'react'
import { auth } from '@/app/lib/firebaseConfig'
import { Firestore } from '@/app/lib/services/Firestore'
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import ExerciseCard from '@/app/(routes)/exercises/ExerciseCard'
import UserContext from '@/app/context/UserAuthContext'

export default function ExerciseList() {
  let { user } = useContext(UserContext)
  const [userExercises, setUserExercises] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      Firestore.readExercises(user).then((exercises) => {
        setUserExercises(exercises)
        setLoading(false)
      })
    } else {
      setLoading(false)
    }
  }, [user])

  return (
    <div>
      {!user && <p>You are not signed in.</p>}
      {user && loading && <p>Loading...</p>}
      {userExercises && userExercises.map((exercise, index) => <ExerciseCard key={exercise.id} exercise={exercise} />)}
      {user && !loading && !userExercises && <p>No exercises found.</p>}
      <button
        className='bg-teal-400 font-bold text-lg rounded-lg px-3 py-2 mt-4 hover:bg-teal-700 hover:text-white'
        onClick={() => console.log(user)}>
        Check User
      </button>
    </div>
  )
}
