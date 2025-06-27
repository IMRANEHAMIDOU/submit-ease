import { Outlet, Navigate } from 'react-router-dom'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import Navbar from '../components/ui/navbar'

export default function Wrapper() {
  const isAuthenticated = useIsAuthenticated()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
   <>
    <Navbar />
    <Outlet />
   </>
  )
  
}
