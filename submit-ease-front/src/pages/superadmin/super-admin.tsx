import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Users, 
  Trophy, 
  Activity,
  Eye,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Shield,
  Globe,
  BarChart3
} from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: number;
  color: string;
  description: string;
}

interface ActivityItem {
  id: number;
  type: 'organization' | 'user' | 'contest';
  action: string;
  time: string;
  user: string;
}

const SuperAdmin: React.FC = () => {
  const [stats, setStats] = useState({
    organizations: 0,
    users: 0,
    contests: 0,
    activeContests: 0
  });

  const [loading, setLoading] = useState(true);

  // Simulation du chargement des données
  useEffect(() => {
    setTimeout(() => {
      setStats({
        organizations: 247,
        users: 18549,
        contests: 156,
        activeContests: 23
      });
      setLoading(false);
    }, 1500);
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

  const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, color, description }) => (
    <div className="card bg-gradient-to-br from-base-100 to-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-base-300/50">
      <div className="card-body p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4 shadow-lg`}>
              {icon}
            </div>
            <h3 className="text-base-content/70 text-sm font-medium mb-1">{title}</h3>
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="skeleton h-8 w-20"></div>
              </div>
            ) : (
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-base-content">{value}</span>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  trend > 0 
                    ? 'bg-success/10 text-success' 
                    : 'bg-error/10 text-error'
                }`}>
                  {trend > 0 ? (
                    <ArrowUpRight className="w-3 h-3" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3" />
                  )}
                  {Math.abs(trend)}%
                </div>
              </div>
            )}
            <p className="text-base-content/50 text-xs mt-2">{description}</p>
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-sm btn-circle">
              <MoreHorizontal className="w-4 h-4" />
            </label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-52 border border-base-300">
              <li><a className="text-sm"><Eye className="w-4 h-4" />Voir détails</a></li>
              <li><a className="text-sm"><BarChart3 className="w-4 h-4" />Statistiques</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Organisations"
            value={loading ? "..." : stats.organizations.toLocaleString()}
            icon={<Building2 className="w-6 h-6 text-white" />}
            trend={12.5}
            color="bg-gradient-to-r from-primary to-primary-focus"
            description="Total des organisations actives"
          />
          
          <StatCard
            title="Utilisateurs"
            value={loading ? "..." : stats.users.toLocaleString()}
            icon={<Users className="w-6 h-6 text-white" />}
            trend={8.2}
            color="bg-gradient-to-r from-secondary to-secondary-focus"
            description="Utilisateurs inscrits"
          />
          
          <StatCard
            title="Concours Total"
            value={loading ? "..." : stats.contests.toString()}
            icon={<Trophy className="w-6 h-6 text-white" />}
            trend={-2.1}
            color="bg-gradient-to-r from-accent to-accent-focus"
            description="Tous les concours créés"
          />
          
          <StatCard
            title="Concours Actifs"
            value={loading ? "..." : stats.activeContests.toString()}
            icon={<Zap className="w-6 h-6 text-white" />}
            trend={15.7}
            color="bg-gradient-to-r from-success to-success-focus"
            description="En cours actuellement"
          />
        </div>

        {/* Main Content */}
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
                  <button className="btn btn-primary btn-block justify-start">
                    <Building2 className="w-4 h-4" />
                    Gérer les Organisations
                  </button>
                  <button className="btn btn-secondary btn-block justify-start">
                    <Users className="w-4 h-4" />
                    Gestion Utilisateurs
                  </button>
                  <button className="btn btn-accent btn-block justify-start">
                    <Trophy className="w-4 h-4" />
                    Modérer les Concours
                  </button>
                  <button className="btn btn-outline btn-block justify-start">
                    <BarChart3 className="w-4 h-4" />
                    Rapports Détaillés
                  </button>
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