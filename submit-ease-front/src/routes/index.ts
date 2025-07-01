
import { 
  Home, 
  Trophy, 
  User, 
  UserCheck, 
  Building2, 
  LayoutDashboard, 
  List, 
  Plus, 
  Edit, 
  FileText, 
  Eye,
  Settings,
  type LucideIcon
} from 'lucide-react';

export type RouteType = {
  path: string;
  name: string;
  icon: LucideIcon;
}

export const publicRoutes: RouteType[] = [
  {
    path: '/',
    name: 'Accueil',
    icon: Home
  },
  {
    path: '/campaigns',
    name: 'Concours',
    icon: Trophy
  },
  {
    path: '/profile',
    name: 'Profil',
    icon: User
  },
  {
    path: '/candidate/1',
    name: 'Espace candidat',
    icon: UserCheck
  },
  {
    path: '/organizations/1',
    name: 'Espace organisation',
    icon: Building2
  }
];

export const adminRoutes: RouteType[] = [
  {
    path: '/admin',
    name: 'Tableau de bord',
    icon: LayoutDashboard
  },
  {
    path: '/admin/campaigns',
    name: 'Tous les concours',
    icon: List
  },
  {
    path: '/admin/campaigns/new',
    name: 'Nouveau concours',
    icon: Plus
  },
  {
    path: '/admin/campaigns/1/edit',
    name: 'Modifier concours',
    icon: Edit
  },
  {
    path: '/admin/campaigns/1/applications',
    name: 'Liste des candidatures',
    icon: FileText
  },
  {
    path: '/admin/campaigns/1/applications/1',
    name: 'Détails candidature',
    icon: Eye
  }
];

export const candidateRoutes: RouteType[] = [
  {
    path: '/campaigns',
    name: 'Concours',
    icon: Trophy
  },
  {
    path: '/profile',
    name: 'Profil',
    icon: User
  }
];

export const superAdminRoutes: RouteType[] = [
  {
    path: '/administration',
    name: 'Administration',
    icon: Settings
  }
];