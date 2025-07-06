import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar'

export default function HomeLayout() {
  return (
   <div className=''>
    <Navbar />
    <Outlet />
   </div>
  )
  
}
