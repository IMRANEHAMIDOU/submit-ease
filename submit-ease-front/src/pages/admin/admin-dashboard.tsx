import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Trophy, 
  Zap,
  Activity,
  Shield,
  Globe,
  ArrowUpRight,
  Unlock,
  FileText
} from 'lucide-react';
import { fetchAdminStats } from '../../services/admin-api';
import type { AdminStatsType } from '../../types/type';
import StatCard from '../../components/stat-card';
import Loading from '../../components/loading';


interface ActivityItem {
  id: number;
  type: 'user' | 'contest' | 'approval';
  action: string;
  time: string;
  user: string;
}

const AdminDashboard: React.FC = () => {
    const [stats, setStats] = useState<AdminStatsType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchAdminStats();
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

  if(loading){
    return <Loading />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 p-6">
      <div className="max-w-7xl mx-auto">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Utilisateurs"
            value={stats!.users_count}
            icon={<Users className="w-6 h-6 text-primary" />}
            trend={12}
            color="bg-primary/10"
            description="Comparé au mois dernier"
            loading={false}
          />

          <StatCard
            title="Tous les concours"
            value={stats!.campaigns_count}
            icon={<FileText className="w-6 h-6 text-primary" />}
            trend={8}
            color="bg-primary/10"
            description="Nombre total de concours créés"
            loading={false}
          />

          <StatCard
            title="Concours ouverts"
            value={stats!.opened_campaigns_count}
            icon={<Unlock className="w-6 h-6 text-primary" />}
            trend={5}
            color="bg-primary/10"
            description="Actuellement ouverts aux candidatures"
            loading={false}
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
      </div>
    </div>
  );
};

export default AdminDashboard;
