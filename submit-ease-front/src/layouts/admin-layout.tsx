import { Link, useLocation, Outlet } from 'react-router-dom'
import { Menu, LogOut, User, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import useSignOut from 'react-auth-kit/hooks/useSignOut'
import type { UserType } from '../types/type'
import ThemeSelector from '../components/ui/theme-selector'
import { adminRoutes, type RouteType } from '../routes'

export default function AdminLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLargeScreen, setIsLargeScreen] = useState(false)
  const location = useLocation()
  const isAuthenticated = useIsAuthenticated()
  const user: UserType | null = useAuthUser()
  const signOut = useSignOut()

  const routes: RouteType[] = adminRoutes

  // Détecter la taille d'écran
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024) // lg breakpoint
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const handleLogout = () => {
    signOut()
    window.location.href = '/login'
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  // Fonction pour vérifier si un lien est actif
  const isActiveLink = (path: string) => {
    return location.pathname === path
  }

  return (
    <>
      {/* Topbar */}
      <div className={`fixed top-0 right-0 z-50 navbar bg-base-100 shadow-sm px-4 ${
        isLargeScreen ? 'left-80' : 'left-0'
      }`}>

        
        <div className="flex items-center">
          {!isLargeScreen && (
            <button
              onClick={toggleMobileMenu}
              className="btn btn-ghost btn-circle mr-2"
            >
              <Menu className="w-6 h-6" />
            </button>
          )}

          <Link 
            to="/" 
            className="text-4xl font-bold" 
            onClick={!isLargeScreen ? closeMobileMenu : undefined}
          >
            Submit<span className="text-accent">Ease</span>
          </Link>
        </div>
        

      </div>

      {/* Mobile Overlay */}
      {!isLargeScreen && isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-base-100 shadow-xl z-50 transition-transform duration-300 ease-in-out ${
          isLargeScreen 
            ? 'translate-x-0' 
            : isMobileMenuOpen 
              ? 'translate-x-0' 
              : '-translate-x-full'
        }`}
      >
        {/* Header du sidebar */}
        <div className="flex items-center justify-between p-4 border-b border-base-200">

          {!isLargeScreen && (
            <button
              onClick={closeMobileMenu}
              className="btn btn-ghost btn-circle btn-sm"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="p-4 flex-1 overflow-y-auto h-full pb-20">
          <ul className="menu w-full">
            {routes.map((item) => {
              const Icon = item.icon
              const isActive = isActiveLink(item.path)
              
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={!isLargeScreen ? closeMobileMenu : undefined}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-content font-semibold'
                        : 'hover:bg-base-200'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

       
        {/* Footer du sidebar */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-base-200 p-4 bg-base-100">
           <div className="flex justify-between mb-4">
            <p>Thème</p>
              <ThemeSelector />
          </div> 

          {isAuthenticated ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-gray-700" />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-sm font-medium truncate">
                    {user?.email}
                  </span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="btn btn-ghost btn-sm text-error flex-shrink-0 ml-2"
                title="Déconnexion"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Link
                to="/login"
                className="btn btn-outline btn-sm"
                onClick={!isLargeScreen ? closeMobileMenu : undefined}
              >
                Se connecter
              </Link>
              <Link
                to="/signup"
                className="btn btn-primary btn-sm"
                onClick={!isLargeScreen ? closeMobileMenu : undefined}
              >
                S'inscrire
              </Link>
            </div>
          )}

        </div>
      </div>

      {/* Contenu principal avec Outlet */}
      <div className={`transition-all duration-300 ${
        isLargeScreen ? 'ml-80 pt-16' : 'pt-16'
      }`}>
        <Outlet />
      </div>
    </>
  )
}