import { Outlet, Navigate } from 'react-router-dom'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'

export default function AuthLayout() {
  const isAuthenticated = useIsAuthenticated()

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return (
    <div className='w-full h-screen'>
      <Outlet />
    </div>
  )
  
}
