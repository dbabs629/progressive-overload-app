import exercises from '../data/exercises.json'
import workouts from '../data/workouts.json'
import LoginPage from './(routes)/login/page'
// import AuthenticateUser from '@/app/ui/auth/AuthenticateUser'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <h1>Progressive Overload Exercise Tracker</h1>
      <br />
      <br />
      <Link href='../exercises'>Exercise List</Link>
      <br />
      <LoginPage />
    </main>
  )
}
