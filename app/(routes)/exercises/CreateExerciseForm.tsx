'use client'
import { useContext } from 'react'
import UserContext from '@/app/context/UserAuthContext'
import AddExercise from '@/app/lib/utils/AddExercise'

export default function CreateExerciseForm() {
  const { user } = useContext(UserContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    AddExercise(e.target, user)
    document.getElementById('createExerciseForm').reset()
  }

  return (
    <form id='createExerciseForm' onSubmit={handleSubmit}>
      <ul className='flex space-x-8'>
        <li>
          <input type='text' placeholder='Exercise name' required />
        </li>
        <li>
          <select name='muscle' required>
            <option value=''>Main Muscle</option>
            <option value='back'>Back</option>
            <option value='biceps'>Biceps</option>
            <option value='chest'>Chest</option>
            <option value='legs'>Legs</option>
            <option value='shoulders'>Shoulders</option>
            <option value='triceps'>Triceps</option>
          </select>
        </li>
        <li>
          <select name='category' required>
            <option value=''>Category</option>
            <option value='barbell'>Barbell</option>
            <option value='bodyweight'>Bodyweight</option>
            <option value='cable'>Cable</option>
            <option value='dumbbell'>Dumbbell</option>
            <option value='machine'>Machine</option>
          </select>
        </li>
        <li>
          Start weight:
          <input type='number' placeholder='0' className='inputNumber' required />
        </li>
        <button type='submit'>
          <strong>Create Exercise</strong>
        </button>
      </ul>
    </form>
  )
}
