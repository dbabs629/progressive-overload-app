import { Firestore } from '@/app/lib/services/Firestore'

export default function DeleteExercise(user, exercise, setAuthExercises) {
  Firestore.deleteExercise(user, exercise).then((user) => {
    console.log('Delete')
    Firestore.readExercises(user).then((exercises) => {
      setAuthExercises(exercises)
    })
  })
}
