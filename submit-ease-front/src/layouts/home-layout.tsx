import { Outlet } from 'react-router-dom'
import Navbar from '../components/ui/navbar'

export default function HomeLayout() {
  return (
   <div className=''>
    <Navbar />
    <Outlet />
   </div>
  )
  
}
