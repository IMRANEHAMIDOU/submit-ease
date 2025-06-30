import { Link } from 'react-router-dom'
import { Menu, LogOut, User } from 'lucide-react'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import useSignOut from 'react-auth-kit/hooks/useSignOut'
import type { UserType } from '../../types/type'
import ThemeSelector from './theme-selector'
import { publicRoutes } from '../../routes'
export default function Navbar() {
  const isAuthenticated = useIsAuthenticated()
  const user : UserType|null = useAuthUser()
  const signOut = useSignOut()

  const handleLogout = () => {
    signOut()
    window.location.href = '/login'
  }

  return (
    <div className="fixed z-1000 navbar bg-base-100 shadow-sm px-4 flex">
      <div className="flex-1">
        <Link to="/" className="text-4xl font-bold">Submit<span className='text-accent'>Ease</span> </Link>
      </div>

      <div className="hidden md:flex gap-4 items-center">
        {publicRoutes.map( route => <Link to={route.path} className="btn btn-ghost" key={route.name}>{route.name}</Link>  )}
         <ThemeSelector />
      </div>

      <div className="flex flex-none gap-4">
        {isAuthenticated ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="w-8 h-8 text-gray-700" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              <li>
                <div className="flex flex-col text-sm px-2 py-1">
                  <span className="font-semibold">{user?.email}</span>
                </div>
              </li>
              <div className="divider my-0"></div>
              <li>
                <a onClick={handleLogout} className="text-error">
                  <LogOut className="w-4 h-4" />
                  Déconnexion
                </a>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link to="/login" className="btn btn-sm btn-outline">Login</Link>
            <Link to="/signup" className="btn btn-sm btn-primary">S'inscrire</Link>
          </>
        )}
      </div>

      {/* Responsive dropdown */}
      <div className="dropdown dropdown-end md:hidden">
        <label tabIndex={0} className="btn btn-ghost btn-circle">
          <Menu className="w-6 h-6" />
        </label>
        <ul tabIndex={0} className="menu dropdown-content z-[50] mt-3 p-2 shadow bg-base-100 rounded-box w-52">
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/concours">Concours</Link></li>
          <li><Link to="/verifier">Vérifier résultat</Link></li>
          {isAuthenticated ? (
            <li><a onClick={handleLogout}>Déconnexion</a></li>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">S'inscrire</Link></li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}
