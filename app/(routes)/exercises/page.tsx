import CreateExerciseForm from '@/app/(routes)/exercises/CreateExerciseForm'
import ExerciseList from '@/app/(routes)/exercises/ExerciseList'

export default function page() {
  return (
    <div>
      <h2>Exercise List</h2>
      <ul className='flex space-x-4 my-4 text-lg text-semibold'>
        <li className='w-[300px] underline'>Exercise Name (days)</li>
        <li className='w-[150px] underline text-center'>Start Date</li>
        <li className='w-[100px] underline text-center'>Muscle</li>
        <li className='w-[100px] underline text-center'>Category</li>
        <li className='w-[200px] underline text-center'>Start Weight (days)</li>
        <li className='w-[200px] underline text-center'>Prev Weight (logs)</li>
        <li className='w-[200px] underline text-center'>Current Weight (logs)</li>
      </ul>
      <ExerciseList />
      <br />
      <CreateExerciseForm />
    </div>
  )
}
