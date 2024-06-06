import { Firestore } from '@/app/lib/services/Firestore'
import { useState, useContext } from 'react'
import UserContext from '@/app/context/UserAuthContext'

export default async function AddExercise(e, user, setAuthExercises, exerciseOrderNumber) {
  let exercise = await [...e].map((input) => input.value)
  let date = new Date().toISOString().slice(0, 10)
  let newExercise = {
    name: exercise[0].trim().toUpperCase(),
    muscle: exercise[1],
    category: exercise[2],
    start_date: date,
    start_weight: exercise[3],
    start_days: 0,
    start_logs: 0,
    previous_date: 0,
    previous_weight: exercise[3],
    previous_days: 0,
    previous_logs: 0,
    previous_weight_different: 0,
    current_date: 0,
    current_weight: exercise[3],
    current_days: 0,
    current_logs: 0,
    current_weight_difference: 0,
    sets: 3,
    reps: 10,
    order_number: exerciseOrderNumber,
  }
  Firestore.writeExercise(user, newExercise).then((user) => {
    console.log('read')
    Firestore.readExercises(user).then((exercises) => {
      setAuthExercises(exercises)
    })
  })
}
