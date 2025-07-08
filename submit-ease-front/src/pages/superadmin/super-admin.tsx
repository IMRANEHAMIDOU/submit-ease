import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Users, 
  Trophy, 
  Activity,
  ArrowUpRight,
  Zap,
  Shield,
  Globe,
} from 'lucide-react';
import StatCard from '../../components/stat-card';
import { fetchSuperAdminStats } from '../../services/admin-api';
import type { AdminStatsType } from '../../types/type';
import { Link } from 'react-router-dom';


interface ActivityItem {
  id: number;
  type: 'organization' | 'user' | 'contest';
  action: string;
  time: string;
  user: string;
}

const SuperAdmin: React.FC = () => {
   const [stats, setStats] = useState<AdminStatsType | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const loadStats = async () => {
        try {
          const data = await fetchSuperAdminStats();
          setStats(data);
        } catch (error) {
          console.error('Erreur en chargeant les stats admin:', error);
        } finally {
          setLoading(false);
        }
      };
  
      loadStats();
    }, []);
  

  const recentActivities: ActivityItem[] = [
    {
      id: 1,
      type: 'organization',
      action: 'Nouvelle organisation créée: TechCorp',
      time: 'Il y a 2 minutes',
      user: 'Admin System'
    },
    {
      id: 2,
      type: 'user',
      action: '15 nouveaux utilisateurs inscrits',
      time: 'Il y a 5 minutes',
      user: 'Auto-Registration'
    },
    {
      id: 3,
      type: 'contest',
      action: 'Concours "Innovation 2025" publié',
      time: 'Il y a 12 minutes',
      user: 'Marie Dubois'
    }
  ];

  const ActivityCard: React.FC<{ activity: ActivityItem }> = ({ activity }) => {
    const getActivityIcon = () => {
      switch (activity.type) {
        case 'organization':
          return <Building2 className="w-4 h-4 text-primary" />;
        case 'user':
          return <Users className="w-4 h-4 text-secondary" />;
        case 'contest':
          return <Trophy className="w-4 h-4 text-accent" />;
        default:
          return <Activity className="w-4 h-4" />;
      }
    };

    return (
      <div className="flex items-start gap-3 p-3 hover:bg-base-200/50 rounded-lg transition-colors">
        <div className="w-8 h-8 rounded-full bg-base-300/50 flex items-center justify-center flex-shrink-0">
          {getActivityIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-base-content truncate">{activity.action}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-base-content/50">{activity.time}</span>
            <span className="text-xs text-base-content/30">•</span>
            <span className="text-xs text-base-content/50">{activity.user}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-base-content">Dashboard SuperAdmin</h1>
              <p className="text-base-content/60">Vue d'ensemble de la plateforme</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-base-content/50">
            <Globe className="w-4 h-4" />
            <span>Dernière mise à jour: {new Date().toLocaleString('fr-FR')}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Organisations"
            value={loading ? "..." : stats!.organizations_count!}
            icon={<Building2 className="w-6 h-6 text-white" />}
            trend={12.5}
            color="bg-gradient-to-r from-primary to-primary-focus"
            description="Total des organisations"
          />
          <StatCard
            title="Organisations en attentes"
            value={loading ? "..." : stats!.pending_organisation!}
            icon={<Building2 className="w-6 h-6 text-white" />}
            trend={12.5}
            color="bg-gradient-to-r from-primary to-primary-focus"
            description="En attente d'approbation"
          />
          <StatCard
            title="Utilisateurs"
            value={loading ? "..." : stats!.users_count!}
            icon={<Users className="w-6 h-6 text-white" />}
            trend={8.2}
            color="bg-gradient-to-r from-secondary to-secondary-focus"
            description="Utilisateurs inscrits"
          />
          
          <StatCard
            title="Concours Total"
            value={loading ? "..." : stats!.campaigns_count!}
            icon={<Trophy className="w-6 h-6 text-white" />}
            trend={-2.1}
            color="bg-gradient-to-r from-accent to-accent-focus"
            description="Tous les concours créés"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activities */}
          <div className="lg:col-span-2">
            <div className="card bg-base-100 shadow-xl border border-base-300/50">
              <div className="card-body">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary" />
                    <h2 className="text-xl font-bold">Activité Récente</h2>
                  </div>
                  <button className="btn btn-ghost btn-sm">
                    Voir tout
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-1">
                  {recentActivities.map((activity) => (
                    <ActivityCard key={activity.id} activity={activity} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="card bg-base-100 shadow-xl border border-base-300/50">
              <div className="card-body">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-accent" />
                  Actions Rapides
                </h2>
                <div className="space-y-3">
                  <Link to={'/superadmin/organizations'} className="btn btn-primary btn-block justify-start">
                    <Building2 className="w-4 h-4" />
                    Gérer les Organisations
                  </Link>
                  <Link to={'/superadmin/users'} className="btn btn-secondary btn-block justify-start">
                    <Users className="w-4 h-4" />
                    Gestion Utilisateurs
                  </Link>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="card bg-gradient-to-br from-success/10 to-success/5 border border-success/20 shadow-xl">
              <div className="card-body">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-success">
                  <Shield className="w-5 h-5" />
                  Statut Système
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Serveurs</span>
                    <div className="badge badge-success badge-sm">En ligne</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Base de données</span>
                    <div className="badge badge-success badge-sm">Optimal</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">API</span>
                    <div className="badge badge-success badge-sm">Stable</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Temps de réponse</span>
                    <span className="text-sm font-mono text-success">127ms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdmin;