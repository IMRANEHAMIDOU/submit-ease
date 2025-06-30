type routeType = {
    path:string,
    name:string,
}
export const publicRoutes : routeType[] = [
    {
        path: '/',
        name: 'Acceuil',
    },
     {
        path: '/compaigns',
        name: 'Concours',
    },
    {
        path: '/profile',
        name: 'Profile'
    },
    {
        path: '/candidate/1',
        name: 'Espace candidat'
    },
    
      {
        path: '/organizations/1',
        name: 'Espace organisation'
    }

]

export const adminRoutes :  routeType[] = [
    {
        path: '/admin',
        name: 'Tableau de bord'
    },
     {
        path: '/admin/compaigns',
        name: 'Tout les concours'
    },
     {
        path: '/admin/compaingns/new',
        name: 'Nouvel concours'
    },
     {
        path: '/admin/compaingns/1/edit',
        name: 'Modifier concours'
    },
     {
        path: '/admin/compaingns/1/applications',
        name: 'Liste des candidature'
    },
     {
        path: '/admin/compaingns/1/applications/1',
        name: 'Details candidature'
    }

]

export const candiateRoutes : routeType[] = [
    {
        path: '/compains',
        name: 'Concours'
    },
    {
        path: '/profile',
        name: 'Profile'
    },
]

export const superAdminRoutes : routeType[] = [
    {
        path: '/administration',
        name: 'Administration'
    }
]