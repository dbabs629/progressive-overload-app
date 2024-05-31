import { getFirestore } from 'firebase/firestore'
import {
  getAuth,
  createUserWithEmailAndPassword,
  connectAuthEmulator,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
} from 'firebase/auth'
import { initializeApp, getApps, getApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID,
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
// export const app = initializeApp({
//   apiKey: 'apikeytest',
//   authDomain: 'authtest',
//   projectId: 'proejctidtest',
//   storageBucket: 'storagebuckettest',
//   messagingSenderId: 'messagingsenderidtest',
//   appId: 'appidtest',
//   measurementId: 'measurementidtest',
// })

// const provider = new GoogleAuthProvider()

const auth = getAuth(app)

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid

    // ...
  } else {
    // User is signed out
    // ...
  }
})

// Connect to emulator
// connectAuthEmulator(auth, 'http://localhost:9099')

const db = getFirestore(app)

export { app, auth, db }
