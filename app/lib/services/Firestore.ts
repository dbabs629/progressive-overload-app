import { setDoc, doc, serverTimestamp, getDocs, collection, addDoc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/app/lib/firebaseConfig'
import { auth } from '@/app/lib/firebaseConfig'

export const Firestore = {
  readExercises: (user) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!user || !user.uid) {
          console.log('User is not signed in')
          resolve(null)
          return
        }
        const userDoc = await doc(db, user.uid, 'user_data')
        const exercisesCollection = await collection(userDoc, 'exercises')
        const docSnapshot = await getDocs(exercisesCollection)
        if (!docSnapshot.docs.length) {
          console.log('No such document!')
          resolve(null)
        } else {
          let exerciseArray = docSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          resolve(exerciseArray)
        }
      } catch (e) {
        console.log(e)
        reject(e)
      }
    })
  },

  writeExercise: (user, newExercise) => {
    return new Promise(async (resolve) => {
      try {
        const userDoc = doc(db, user.uid, 'user_data')
        const exercisesCollectionRef = collection(userDoc, 'exercises')
        const newExerciseDoc = await addDoc(exercisesCollectionRef, newExercise)
        await setDoc(newExerciseDoc, { ...newExercise, id: newExerciseDoc.id })
        console.log('New exercise added with ID: ', newExerciseDoc.id)
      } catch (e) {
        console.log(e)
      }
    })
  },

  updateExercise: (user, updatedExercise) => {
    return new Promise(async (resolve) => {
      try {
        const userDoc = doc(db, user.uid, 'user_data')
        const exerciseDocRef = doc(userDoc, 'exercises', updatedExercise.id)
        await updateDoc(exerciseDocRef, { id: updatedExercise.id, ...updatedExercise })
        console.log('New exercise added with ID: ', updatedExercise.id)
      } catch (e) {
        console.log(e)
      }
    })
  },

  createUser: (user) => {
    return new Promise(async (resolve, reject) => {
      try {
        const userDoc = await doc(db, user.uid, 'user_data')
        resolve(
          await setDoc(userDoc, {
            email: `${user.email}`,
          })
        )
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  },
}
