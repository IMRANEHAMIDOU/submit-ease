import { 
  Home, 
  Trophy, 
  User, 
  Building2, 
  LayoutDashboard, 
  List, 
  Users,
  type LucideIcon,
} from 'lucide-react'

export type RouteType = {
  path: string
  name: string
  icon: LucideIcon
}


export const publicRoutes: RouteType[] = [
  {
    path: '/',
    name: 'Accueil',
    icon: Home,
  },
  {
    path: '/campaigns',
    name: 'Concours',
    icon: Trophy,
  },
]

export const adminRoutes: RouteType[] = [
  {
    path: '/admin/dashboard',
    name: 'Tableau de bord',
    icon: LayoutDashboard,
  },
  {
    path: '/admin/campaigns',
    name: 'Tous les concours',
    icon: List,
  },
   {
    path: '/admin/profile',
    name: 'Mon profile',
    icon: User,
  },
]

export const candidateRoutes: RouteType[] = [
  {
    path: '/candidate/dashboard',
    name: 'Tableau de bord',
    icon: LayoutDashboard,
  },
  {
    path: '/candidate/campaigns',
    name: 'Tous les concours',
    icon: Trophy,
  },
  {
    path: '/candidate/profile',
    name: 'Mon profile',
    icon: User,
  },
]

export const superAdminRoutes: RouteType[] = [
  {
    path: '/superadmin/dashboard',
    name: 'Tableau de bord',
    icon: LayoutDashboard,
  },
  {
    path: '/superadmin/organizations',
    name: 'Organisations',
    icon: Building2,
  },
  {
    path: '/superadmin/users',
    name: 'Utilisateurs',
    icon: Users,
  },
   {
    path: '/superadmin/profile',
    name: 'Mon profile',
    icon: User,
  },
]
