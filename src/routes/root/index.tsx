import { Outlet } from 'react-router-dom'
import { Header } from '../../components/header'

export function Root() {
  return (
    <div className="max-w-7xl mx-auto py-5 flex flex-col gap-5">
      <Header />
      <Outlet />
    </div>
  )
}
