import { Calendar, Eye, FileText, Clock, CheckCircle, XCircle, AlertCircle, Award, User, Hash } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { MyCampaignType } from '../../types/type';
import { apiMyCampaigns } from '../../services/user-api';
import Loading from '../../components/loading';
import { formatDate } from '../../utils/utils';



const MyCampaignsPage = () => {
  const [selectedCampaign, setSelectedCampaign] = useState<MyCampaignType | null>(null);
  const [campaigns, setCampaigns] = useState<MyCampaignType[]>([]);
  const [loading, setLoading] = useState(false)


  const fetchMyCampaigns = async()=>{
    setLoading(true)
    try {
      const data = await apiMyCampaigns() as MyCampaignType[]
      setCampaigns(data)
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }


  }

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'accepte':
        return 'bg-success/20 text-success border-success/30';
      case 'refuse':
        return 'bg-error/20 text-error border-error/30';
      case 'en_attente':
        return 'bg-warning/20 text-warning border-warning/30';
      default:
        return 'bg-base-300/20 text-base-content border-base-300/30';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'Accepté';
      case 'rejected':
        return 'Refusé';
      case 'pending':
        return 'En attente';
      default:
        return 'Inconnu';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getCampaignStatusStyle = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success/20 text-success border-success/30';
      case 'closed':
        return 'bg-error/20 text-error border-error/30';
      case 'draft':
        return 'bg-warning/20 text-warning border-warning/30';
      default:
        return 'bg-base-300/20 text-base-content border-base-300/30';
    }
  };

  const getCampaignStatusText = (status: string) => {
    switch (status) {
      case 'open':
        return 'Ouvert';
      case 'closed':
        return 'Terminé';
      default:
        return 'Inconnu';
    }
  };

  const CampaignCard = ({ campaign }: { campaign: MyCampaignType }) => (
    <div className="bg-base-100 rounded-xl shadow-sm border border-base-300 hover:shadow-md transition-all duration-200 flex flex-col hover:border-accent/50">
      <div className="bg-gradient-to-r from-accent to-accent/80 p-4 rounded-t-xl text-accent-content">
        <h3 className="font-bold text-lg mb-2 leading-tight line-clamp-2">
          {campaign.title}
        </h3>
        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getCampaignStatusStyle(campaign.status)}`}>
          {getCampaignStatusText(campaign.status)}
        </span>
      </div>
      {/* Contenu principal */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="space-y-3 flex-1">
          <div>
            <span className="text-sm text-base-content/60">Numéro d'inscription</span>
            <p className="font-medium text-base-content flex items-center gap-1">
              <Hash className="w-4 h-4 text-accent" />
              {campaign.registration_number}
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-base-content/70">
            <User className="w-4 h-4 text-accent" />
            <span className="font-medium">{campaign.profile_name}</span>
          </div>

          {campaign.application_status && (
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusStyle(campaign.application_status)}`}>
                {getStatusIcon(campaign.application_status)}
                {getStatusText(campaign.application_status)}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2 text-sm text-base-content/70">
            <Calendar className="w-4 h-4 text-accent" />
            <span>Soumis le {formatDate(campaign.created_at)}</span>
          </div>

          {campaign.status_reason && (
              <div
                className={`
                  rounded-xl p-4 border 
                  ${campaign.application_status === 'accepted'
                    ? 'bg-success/10 border-success/20'
                    : campaign.application_status === 'rejected'
                    ? 'bg-error/10 border-error/20'
                    : 'bg-warning/10 border-warning/20'}
                `}
              >
                <h3
                  className={`
                    font-semibold mb-2
                    ${campaign.application_status === 'accepted'
                      ? 'text-success'
                      : campaign.application_status === 'rejected'
                      ? 'text-error'
                      : 'text-warning'}
                  `}
                >
                  Raison du statut
                </h3>
                <p
                  className={`
                    leading-relaxed
                    ${campaign.application_status === 'accepted'
                      ? 'text-success/80'
                      : campaign.application_status === 'rejected'
                      ? 'text-error/80'
                      : 'text-warning/80'}
                  `}
                >
                  {campaign.status_reason}
                </p>
              </div>
            )}
        </div>

        {/* Bouton */}
        <button 
          onClick={() => setSelectedCampaign(campaign)}
          className="w-full btn btn-accent btn-sm mt-4 flex items-center justify-center gap-2"
        >
          <Eye className="w-4 h-4" />
          Voir détails
        </button>
      </div>
    </div>
  );

  const CampaignDetails = ({ campaign }: { campaign: MyCampaignType }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-base-100 rounded-2xl shadow-2xl border border-base-300 max-w-3xl w-full max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-r from-accent to-accent/80 p-6 text-accent-content">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-2">{campaign.title}</h2>
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border bg-base-100/20 text-accent-content border-accent-content/30`}>
                  {getCampaignStatusText(campaign.status)}
                </span>
                {campaign.application_status && (
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(campaign.application_status)}`}>
                    {getStatusIcon(campaign.application_status)}
                    {getStatusText(campaign.application_status)}
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={() => setSelectedCampaign(null)}
              className="btn btn-ghost btn-sm text-accent-content hover:bg-accent-content/20"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Contenu */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          <div className="space-y-6">
            {/* Informations principales */}
            <div className="bg-base-200/50 rounded-xl p-4">
              <h3 className="font-semibold text-base-content mb-3">Informations de candidature</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-base-content/60">Profil visé</span>
                  <p className="font-medium text-base-content">{campaign.profile_name}</p>
                </div>
                <div>
                  <span className="text-sm text-base-content/60">Date de soumission</span>
                  <p className="font-medium text-base-content">{formatDate(campaign.created_at)}</p>
                </div>
                {campaign.registration_number && (
                  <div>
                    <span className="text-sm text-base-content/60">Numéro d'inscription</span>
                    <p className="font-medium text-base-content flex items-center gap-1">
                      <Hash className="w-4 h-4 text-accent" />
                      {campaign.registration_number}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {campaign.status === 'closed' && campaign.application_score && (
              <div className="bg-accent/10 rounded-xl p-4 border border-accent/20">
                <h3 className="font-semibold text-base-content mb-3">Résultats</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Award className="w-5 h-5 text-accent" />
                    </div>
                    <span className="text-sm text-base-content/60">Score Dossier</span>
                    <p className="font-bold text-xl text-accent">{campaign.application_score}/10</p>
                  </div>
                  {campaign.writen_test_average && (
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <FileText className="w-5 h-5 text-accent" />
                      </div>
                      <span className="text-sm text-base-content/60">Test écrit</span>
                      <p className="font-bold text-xl text-accent">{campaign.writen_test_average}/20</p>
                    </div>
                  )}
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <CheckCircle className="w-5 h-5 text-accent" />
                    </div>
                    <span className="text-sm text-base-content/60">Entretien</span>
                    <p className={`font-bold text-xl ${campaign.interview_test_authorized ? 'text-success' : 'text-error'}`}>
                      {campaign.interview_test_authorized ? 'Autorisé' : 'Non autorisé'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Dates de campagne */}
            <div className="bg-base-200/50 rounded-xl p-4">
              <h3 className="font-semibold text-base-content mb-3">Période de campagne</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-base-content/60">Date d'ouverture</span>
                  <p className="font-medium text-base-content">{campaign.opening_date ? formatDate(campaign.opening_date) : 'Non définie'}</p>
                </div>
                <div>
                  <span className="text-sm text-base-content/60">Date de fermeture</span>
                  <p className="font-medium text-base-content">{campaign.closing_date ? formatDate(campaign.closing_date) : 'Non définie'}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            {campaign.description && (
              <div className="bg-base-200/50 rounded-xl p-4">
                <h3 className="font-semibold text-base-content mb-3">Description</h3>
                <p className="text-base-content/80 leading-relaxed">{campaign.description}</p>
              </div>
            )}

            {/* Raison du statut */}
             {campaign.status_reason && (
              <div
                className={`
                  rounded-xl p-4 border 
                  ${campaign.application_status === 'accepted'
                    ? 'bg-success/10 border-success/20'
                    : campaign.application_status === 'rejected'
                    ? 'bg-error/10 border-error/20'
                    : 'bg-warning/10 border-warning/20'}
                `}
              >
                <h3
                  className={`
                    font-semibold mb-2
                    ${campaign.application_status === 'accepted'
                      ? 'text-success'
                      : campaign.application_status === 'rejected'
                      ? 'text-error'
                      : 'text-warning'}
                  `}
                >
                  Raison du statut
                </h3>
                <p
                  className={`
                    leading-relaxed
                    ${campaign.application_status === 'accepted'
                      ? 'text-success/80'
                      : campaign.application_status === 'rejected'
                      ? 'text-error/80'
                      : 'text-warning/80'}
                  `}
                >
                  {campaign.status_reason}
                </p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );


  useEffect(()=>{
    fetchMyCampaigns()
     
  }, [])

  if(loading){
    return <Loading />
  }
  return (
    <div className="min-h-screen bg-base-200/30 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-base-content mb-2">Mes Campagnes</h1>
          <p className="text-base-content/70">Suivez l'évolution de vos candidatures et consultez vos résultats</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>

        {campaigns.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-base-content/40 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-base-content mb-2">Aucune campagne</h3>
            <p className="text-base-content/60">Vous n'avez pas encore de campagnes.</p>
          </div>
        )}
      </div>

      {selectedCampaign && (
        <CampaignDetails campaign={selectedCampaign} />
      )}
    </div>
  );
};

export default MyCampaignsPage;