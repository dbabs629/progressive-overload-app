import CreateExerciseForm from '@/app/(routes)/exercises/CreateExerciseForm'
import ExerciseList from '@/app/(routes)/exercises/ExerciseList'

export default function page() {
  return (
    <div>
      <h2>Exercise List</h2>

      <ExerciseList />
      <br />
      <CreateExerciseForm />
    </div>
  )
}
