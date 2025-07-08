import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Users, 
  Trophy, 
  Zap,
  Activity,
  Eye,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Shield,
  Globe
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
  type: 'user' | 'contest' | 'approval';
  action: string;
  time: string;
  user: string;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    managedUsers: 124,
    managedContests: 8,
    pendingApprovals: 3,
  });

  const [loading, setLoading] = useState(true);

  // Simulation fetch données spécifiques à l'admin
  useEffect(() => {
    setTimeout(() => {
      setStats({
        managedUsers: 150,
        managedContests: 10,
        pendingApprovals: 2,
      });
      setLoading(false);
    }, 1200);
  }, []);

  const recentActivities: ActivityItem[] = [
    {
      id: 1,
      type: 'user',
      action: 'Utilisateur activé : John Doe',
      time: 'Il y a 10 min',
      user: 'Admin System',
    },
    {
      id: 2,
      type: 'approval',
      action: 'Demande d’approbation reçue',
      time: 'Il y a 30 min',
      user: 'Système',
    },
    {
      id: 3,
      type: 'contest',
      action: 'Nouveau concours publié : Coding Battle',
      time: 'Il y a 2h',
      user: 'Sarah Admin',
    },
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
              <div className="skeleton h-8 w-20"></div>
            ) : (
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-base-content">{value}</span>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  trend >= 0 ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                }`}>
                  {trend >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
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
              <li><a className="text-sm"><Eye className="w-4 h-4" /> Voir détails</a></li>
              <li><a className="text-sm"><BarChart3 className="w-4 h-4" /> Statistiques</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const ActivityCard: React.FC<{ activity: ActivityItem }> = ({ activity }) => {
    const getIcon = () => {
      switch (activity.type) {
        case 'user':
          return <Users className="w-4 h-4 text-secondary" />;
        case 'contest':
          return <Trophy className="w-4 h-4 text-accent" />;
        case 'approval':
          return <Zap className="w-4 h-4 text-warning" />;
        default:
          return <Activity className="w-4 h-4" />;
      }
    };

    return (
      <div className="flex items-start gap-3 p-3 hover:bg-base-200/50 rounded-lg transition-colors">
        <div className="w-8 h-8 rounded-full bg-base-300/50 flex items-center justify-center">
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{activity.action}</p>
          <div className="flex items-center gap-2 text-xs text-base-content/50 mt-1">
            <span>{activity.time}</span>
            <span>•</span>
            <span>{activity.user}</span>
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
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-secondary to-secondary-focus flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-base-content">Dashboard Admin</h1>
              <p className="text-base-content/60">Vue d'ensemble de votre organisation</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-base-content/50">
            <Globe className="w-4 h-4" />
            <span>Dernière mise à jour : {new Date().toLocaleString('fr-FR')}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Utilisateurs gérés"
            value={stats.managedUsers.toString()}
            icon={<Users className="w-6 h-6 text-white" />}
            trend={5}
            color="bg-gradient-to-r from-secondary to-secondary-focus"
            description="Utilisateurs actifs sous votre gestion"
          />
          <StatCard
            title="Concours gérés"
            value={stats.managedContests.toString()}
            icon={<Trophy className="w-6 h-6 text-white" />}
            trend={-2}
            color="bg-gradient-to-r from-accent to-accent-focus"
            description="Concours dans votre périmètre"
          />
          <StatCard
            title="Demandes en attente"
            value={stats.pendingApprovals.toString()}
            icon={<Zap className="w-6 h-6 text-white" />}
            trend={3}
            color="bg-gradient-to-r from-warning to-warning-focus"
            description="Approvals à traiter"
          />
        </div>

        {/* Activités récentes */}
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

        {/* Actions rapides */}
        <div className="card bg-base-100 shadow-xl border border-base-300/50 mt-6">
          <div className="card-body">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-accent" />
              Actions Rapides
            </h2>
            <div className="space-y-3">
              <button className="btn btn-secondary btn-block justify-start">
                <Users className="w-4 h-4" />
                Gérer Utilisateurs
              </button>
              <button className="btn btn-accent btn-block justify-start">
                <Trophy className="w-4 h-4" />
                Gérer Concours
              </button>
              <button className="btn btn-outline btn-block justify-start">
                <BarChart3 className="w-4 h-4" />
                Voir Rapports
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
