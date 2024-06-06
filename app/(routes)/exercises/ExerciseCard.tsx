'use client'
import { useState, useContext } from 'react'
import UserContext from '@/app/context/UserAuthContext'
import UpdateExercise from '@/app/lib/utils/UpdateExercise'
import DeleteExercise from '@/app/lib/utils/DeleteExercise'

export default function ExerciseCard({ exercise, toggleDaysLogs }) {
  const { user, setAuthExercises } = useContext(UserContext)
  const [edit, setEdit] = useState(false)
  let date = new Date()
  let startDate = new Date(exercise.start_date)
  let prevDate = new Date(exercise.prev_date)
  let currentDate = new Date(exercise.current_date)
  let startDifferenceInMilliseconds = date - startDate
  let prevDifferenceInMilliseconds = date - startDate
  let currentDifferenceInMilliseconds = date - startDate
  let startDifferenceInDays = Math.floor(startDifferenceInMilliseconds / (1000 * 60 * 60 * 24))
  let prevDifferenceInDays = Math.floor(prevDifferenceInMilliseconds / (1000 * 60 * 60 * 24))
  let currentDifferenceInDays = Math.floor(currentDifferenceInMilliseconds / (1000 * 60 * 60 * 24))

  let editInput = !edit ? '' : 'editInput'
  let handleClick = (e) => {
    setEdit(true)
    // if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'OPTION') {
    //   setEdit(true)
    // } else {
    //   setEdit(!edit)
    // }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (e.nativeEvent.submitter.name === 'save') {
      let updatedExerciseInputs = [...e.target.elements]
      exercise = UpdateExercise(exercise, updatedExerciseInputs, user, setAuthExercises)
      setEdit(false)
    } else if (e.nativeEvent.submitter.name === 'delete') {
      DeleteExercise(user, exercise, setAuthExercises)
    } else {
      document.getElementById(exercise.id).reset()
      setEdit(false)
    }
  }

  return (
    <form id={`${exercise.id}`} className='editForm flex bg-red-700' onClick={handleClick} onSubmit={handleSubmit}>
      <ul className='flex space-x-4 h-20 bg-blue-700'>
        <li className='w-[50px]'>
          <input type='number' name='orderNumber' defaultValue={exercise.order_number} className={editInput} required />
        </li>
        <li className='w-[300px]'>
          <input type='text' name='name' defaultValue={exercise.name} className={editInput} required />
        </li>
        <li className='w-[150px] text-center'>
          <input type='date' name='start_date' defaultValue={exercise.start_date} className={editInput} required />
        </li>
        <li className='w-[100px]'>
          <select name='muscle' defaultValue={exercise.muscle} className={editInput} required>
            <option value=''>Main Muscle</option>
            <option value='back'>Back</option>
            <option value='biceps'>Biceps</option>
            <option value='chest'>Chest</option>
            <option value='legs'>Legs</option>
            <option value='shoulders'>Shoulders</option>
            <option value='triceps'>Triceps</option>
          </select>
        </li>
        <li className='w-[100px]'>
          <select name='category' defaultValue={exercise.category} className={editInput} required>
            <option value=''>Category</option>
            <option value='barbell'>Barbell</option>
            <option value='bodyweight'>Bodyweight</option>
            <option value='cable'>Cable</option>
            <option value='dumbbell'>Dumbbell</option>
            <option value='machine'>Machine</option>
          </select>
        </li>
        <li className='flex justify-around w-[225px]'>
          <p className=' inline'>Start Weight ({!toggleDaysLogs ? startDifferenceInDays : exercise.start_logs}):</p>
          <p className=' inline text-right'>
            <input
              type='number'
              name='start_weight'
              defaultValue={exercise.start_weight}
              className={editInput}
              required
            />
            lb
            {exercise.current_weight - exercise.start_weight === 0
              ? null
              : exercise.current_weight - exercise.start_weight > 0
              ? ` +${exercise.current_weight - exercise.start_weight}`
              : ` ${exercise.current_weight - exercise.start_weight}`}
          </p>
        </li>
        <li className='flex justify-around w-[225px]'>
          <p className=' inline'>Prev Weight ({!toggleDaysLogs ? prevDifferenceInDays : exercise.previous_logs}):</p>
          <p className=' inline text-right'>
            <input
              type='number'
              name='previous_weight'
              defaultValue={exercise.previous_weight}
              className={editInput}
              required
            />
            lb
          </p>
        </li>
        <li className='flex justify-around w-[225px]'>
          <p className=' inline'>Weight ({!toggleDaysLogs ? currentDifferenceInDays : exercise.current_logs}):</p>
          <p className=' inline text-right'>
            <input
              type='number'
              name='current_weight'
              defaultValue={exercise.current_weight}
              className={editInput}
              required
            />
            lb
            {exercise.current_weight - exercise.previous_weight === 0
              ? null
              : exercise.current_weight - exercise.previous_weight > 0
              ? ` +${exercise.current_weight - exercise.previous_weight}`
              : ` ${exercise.current_weight - exercise.previous_weight}`}
          </p>
        </li>
      </ul>
      {edit === true && (
        <div>
          <button type='submit' name='save'>
            <strong>Save changes</strong>
          </button>
          <button type='submit' name='cancel'>
            <strong>Cancel</strong>
          </button>
          <button type='submit' name='delete'>
            <strong>Delete</strong>
          </button>
        </div>
      )}
    </form>
  )
}
