import { Firestore } from '@/app/lib/services/Firestore'

export default function UpdateExercise(exercise, updatedExerciseInputs, user) {
  let updatedExercise = exercise
  updatedExerciseInputs.forEach((element) => {
    if (element.tagName === 'INPUT' || element.tagName === 'SELECT') {
      Object.keys(updatedExercise).forEach((key) => {
        if (element.name === key) {
          return (updatedExercise[key] = element.value)
        }
      })
    }
  })
  Firestore.updateExercise(user, updatedExercise)
  console.log('Updated Exercise:', updatedExercise)
  return updatedExercise
}
