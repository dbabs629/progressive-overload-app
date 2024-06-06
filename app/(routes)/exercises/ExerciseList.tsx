'use client'
import { useState, useEffect, useContext } from 'react'
import { auth } from '@/app/lib/firebaseConfig'
import { Firestore } from '@/app/lib/services/Firestore'
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import ExerciseCard from '@/app/(routes)/exercises/ExerciseCard'
import UserContext from '@/app/context/UserAuthContext'

export default function ExerciseList() {
  let { user, authExercises } = useContext(UserContext)
  const [loading, setLoading] = useState(true)
  const [toggleDaysLogs, setToggleDaysLogs] = useState(false)

  // const [userExercises, setUserExercises] = useState()
  // console.log(authExercises)
  useEffect(() => {
    if (authExercises) {
      setLoading(false)
    } else if (!authExercises) {
      setLoading(true)
    }
  }, [authExercises])

  return (
    <div>
      <ul className='flex pl-16 space-x-4 my-4 text-lg text-semibold'>
        <li className='w-[300px] underline'>Exercise Name (days)</li>
        <li className='w-[150px] underline text-center'>Start Date</li>
        <li className='w-[100px] underline text-center'>Muscle</li>
        <li className='w-[100px] underline text-center'>Category</li>
        <li className='w-[200px] underline text-center' onClick={() => setToggleDaysLogs(!toggleDaysLogs)}>
          Start Weight ({!toggleDaysLogs ? `days` : `logs`})
        </li>
        <li className='w-[200px] underline text-center' onClick={() => setToggleDaysLogs(!toggleDaysLogs)}>
          Prev Weight ({!toggleDaysLogs ? `days` : `logs`})
        </li>
        <li className='w-[200px] underline text-center' onClick={() => setToggleDaysLogs(!toggleDaysLogs)}>
          Current Weight ({!toggleDaysLogs ? `days` : `logs`})
        </li>
      </ul>
      {!user && <p>You are not signed in.</p>}
      {user && loading && <p>Loading...</p>}
      {authExercises &&
        authExercises.map((exercise, index) => (
          <ExerciseCard key={exercise.id} exercise={exercise} toggleDaysLogs={toggleDaysLogs} />
        ))}
      <button
        className='bg-teal-400 font-bold text-lg rounded-lg px-3 py-2 mt-4 hover:bg-teal-700 hover:text-white'
        onClick={() => console.log(user.uid)}>
        Check User
      </button>
    </div>
  )
}
