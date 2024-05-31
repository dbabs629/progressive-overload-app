'use client'
import { useState, useContext } from 'react'
import UserContext from '@/app/context/UserAuthContext'
import UpdateExercise from '@/app/lib/utils/UpdateExercise'

export default function ExerciseCard({ exercise }) {
  const { user } = useContext(UserContext)

  // const [exercise, setExercise] = useState({ initialExercise })
  const [edit, setEdit] = useState(false)
  console.log(exercise.id)
  let date = new Date().toISOString().slice(0, 10)
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
      exercise = UpdateExercise(exercise, updatedExerciseInputs, user)
      setEdit(false)
    } else if (e.nativeEvent.submitter.name === 'cancel') {
      document.getElementById(exercise.id).reset()
      setEdit(false)
    }
  }

  return (
    <form id={`${exercise.id}`} className='editForm flex bg-red-700' onClick={handleClick} onSubmit={handleSubmit}>
      <ul className='flex space-x-4 h-20 bg-blue-700'>
        <li className='w-[300px]'>
          <input type='text' name='name' defaultValue={exercise.name} className={editInput} required /> (
          {exercise.start_days})
        </li>
        <li className='w-[150px] text-center'>
          <input type='date' name='start_date' defaultValue={date} className={editInput} required />
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
          <p className=' inline'>Start Weight ({exercise.current_days}):</p>
          <p className=' inline text-right'>
            <input
              type='number'
              name='start_weight'
              defaultValue={exercise.start_weight}
              className={editInput}
              required
            />
            lb
            {exercise.current_weight_difference >= 0
              ? ` + ${exercise.current_weight_difference}`
              : exercise.current_weight_difference}
          </p>
        </li>
        <li className='flex justify-around w-[225px]'>
          <p className=' inline'>Prev Weight ({exercise.previous_logs}):</p>
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
          <p className=' inline'>Weight ({exercise.current_logs}):</p>
          <p className=' inline text-right'>
            <input
              type='number'
              name='current_weight'
              defaultValue={exercise.current_weight}
              className={editInput}
              required
            />
            lb
            {exercise.previous_weight_difference >= 0
              ? ` + ${exercise.previous_weight_difference}`
              : exercise.previous_weight_difference}
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
        </div>
      )}
    </form>
  )
}
