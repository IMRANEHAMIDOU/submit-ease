import { Outlet, Navigate } from 'react-router-dom'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'

export default function AuthLayout() {
  const isAuthenticated = useIsAuthenticated()

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <Outlet />
    </div>
  )
  
}
