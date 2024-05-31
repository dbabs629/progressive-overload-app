'use client'
import React, { useState, useEffect, useContext } from 'react'
import {
  getAuth,
  createUserWithEmailAndPassword,
  connectAuthEmulator,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  AuthErrorCodes,
  signOut,
} from 'firebase/auth'
import { auth, app } from '@/app/lib/firebaseConfig'
import { useRouter } from 'next/navigation'
import { Firestore } from '@/app/lib/services/Firestore'
import UserContext from '@/app/context/UserAuthContext'

const LoginPage = () => {
  const router = useRouter()
  let { user } = useContext(UserContext)
  const [isLogin, setIsLogin] = useState(true)
  // const [userLoggedIn, setUserLoggedIn] = useState(!user ? false : true)
  const [error, setError] = useState(null)

  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // const [confirmPassword, setConfirmPassword] = useState('')

  useEffect(() => {}, [user])

  useEffect(() => {}, [error])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (e.nativeEvent.submitter.name === 'login') {
      let [email, password, confirmPassword] = [...e.target.elements]
      userSignIn(email.value, password.value)
    } else if (e.nativeEvent.submitter.name === 'create-user') {
      let [email, password, confirmPassword] = [...e.target.elements]
      if (password.value !== confirmPassword.value) {
        alert('Passwords do not match')
      } else {
        createUserAccount(email.value, password.value)
      }
    } else if (e.nativeEvent.submitter.name === 'logout') {
      userSignOut()
    }
  }

  const createUserAccount = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setError(null)
        const user = userCredential.user
        Firestore.createUser(user)
        console.log('User created:', user)
        router.push('/exercises')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        setError(errorMessage)
        console.error('Error:', errorCode, errorMessage)
      })
  }

  const userSignIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setError(null)
        const user = userCredential.user
        console.log('User logged in:', user)
        router.push('/exercises')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        setError(errorMessage)
        console.error('Error:', errorCode, errorMessage)
      })
  }

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        // setUserLoggedIn(false)
        console.log('You have been signed out')
      })
      .catch((error) => {
        // An error happened.
        console.log(error)
      })
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen text-slate-800'>
      <form onSubmit={handleSubmit} className='max-w-96 w-full p-6 bg-white rounded shadow-md'>
        <div>
          {!user ? (
            <h2 className='text-2xl text-center mb-4'>{isLogin ? 'Login' : 'Create Account'}</h2>
          ) : (
            <h2 className='text-2xl text-center mb-4'>You are logged in</h2>
          )}
          {!user ? (
            <div>
              <input
                type='email'
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                className='w-full p-2 mb-4 border rounded'
                placeholder='Email'
              />
              <input
                type='password'
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                className='w-full p-2 mb-4 border rounded'
                placeholder='Password'
              />
              <input
                type='password'
                // value={confirmPassword}
                // onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full p-2 mb-4 border rounded ${isLogin ? 'hidden' : ''}`}
                placeholder='Confirm Password'
                style={{ '::placeholder': { color: isLogin ? 'transparent' : 'inherit' } }}
              />
              {!error ? null : <p className='text-red-500'>{error}</p>}
              <button
                name='login'
                type='submit'
                className='w-full p-2 mb-4 bg-blue-500 text-white rounded'
                style={{ display: !isLogin ? 'none' : 'block' }}>
                Login
              </button>
              <button
                name='create-user'
                type='submit'
                className='w-full p-2 mb-4 bg-blue-500 text-white rounded'
                style={{ display: !isLogin ? 'block' : 'none' }}>
                Create Account
              </button>
              <p className='text-center'>
                {isLogin ? 'Create account instead' : 'Already have an account, login instead'}
                <button type='submit' onClick={() => setIsLogin(!isLogin)} className='ml-2 text-blue-500 underline'>
                  Click here
                </button>
              </p>
            </div>
          ) : (
            <button name='logout' type='submit' className='w-full p-2 mb-4 bg-red-600 text-white rounded'>
              Logout
            </button>
          )}
        </div>
      </form>
      <button
        className='bg-teal-400 font-bold text-lg rounded-lg px-3 py-2 mt-4 hover:bg-teal-700 hover:text-white'
        onClick={() => console.log(user)}>
        Check user
      </button>
    </div>
  )
}

export default LoginPage
