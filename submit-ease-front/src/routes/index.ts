import { 
  Home, 
  Trophy, 
  User, 
  Building2, 
  LayoutDashboard, 
  List, 
  FileText, 
  Eye,
  Users,
  type LucideIcon,
} from 'lucide-react'

export type RouteType = {
  path: string
  name: string
  icon: LucideIcon // tu peux aussi garder LucideIcon si tu veux taper strict
}

// 🟢 Routes publiques
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

// 🟠 Routes administrateur
export const adminRoutes: RouteType[] = [
  {
    path: '/admin',
    name: 'Tableau de bord',
    icon: LayoutDashboard,
  },
  {
    path: '/admin/campaigns',
    name: 'Tous les concours',
    icon: List,
  },
  {
    path: '/admin/campaigns/1/applications',
    name: 'Liste des candidatures',
    icon: FileText,
  },
  {
    path: '/admin/campaigns/1/applications/1',
    name: 'Détails candidature',
    icon: Eye,
  },
   {
    path: '/admin/profile',
    name: 'Mon profile',
    icon: User,
  },
]

// 🟡 Routes candidat
export const candidateRoutes: RouteType[] = [
  {
    path: '/candidate/campaigns',
    name: 'Tous les concours',
    icon: Trophy,
  },
  {
    path: '/candidate/mycampaigns',
    name: 'Mes concours',
    icon: Trophy,
  },
  {
    path: '/candidate/profile',
    name: 'Mon profile',
    icon: User,
  },
]

// 🔴 Routes superadmin
export const superAdminRoutes: RouteType[] = [
  {
    path: '/superadmin',
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
