import { AttendeeList } from './components/attendee-list'
import { Header } from './components/header'

export function App() {
  return (
    <div className="max-w-7xl mx-auto py-5">
      <Header />
      <AttendeeList />
    </div>
  )
}
