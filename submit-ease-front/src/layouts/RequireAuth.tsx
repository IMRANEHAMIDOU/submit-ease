import { Navigate, Outlet } from 'react-router-dom'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import type { UserType } from '../types/type'

type RequireAuthProps = {
  allowedRoles: string[]
  children?: React.ReactNode
}

export default function RequireAuth({ allowedRoles, children }: RequireAuthProps) {
  const isAuthenticated = useIsAuthenticated()
  const user = useAuthUser<UserType | null>()

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />
  }

  // Autorisé → on affiche children ou Outlet
  return <>{children ? children : <Outlet />}</>
}
