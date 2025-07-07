import { 
  Calendar, 
  Clock, 
  FileText, 
  MessageCircle, 
  Users, 
  ExternalLink,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { CampaignType, UserType } from "../../types/type";
import { showCampaignAdmin, showCampaignPublic } from "../../services/campaign-api";
import Loading from "../../components/loading";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import CandidateApplicationsTable from "./candidate-application-list";
import { formatDate, getDaysRemaining, getStatusStyle, getStatusText } from "../../utils/utils";

const CampaignAdminShow = () => {
  const { id, link } = useParams();
  const [loading, setLoading] = useState(true);
  const [campaign, setCampaign] = useState<CampaignType | null>(null);

  const authUser : UserType|null= useAuthUser()

  const fetchCampaign = async () => {
    if (!id && !link) {
      window.location.href = '/';
      return;
    }

    try {
      setLoading(true);
      let data : CampaignType|null|undefined

      if(authUser?.organization_id && id){
        data = await showCampaignAdmin(parseInt(id), authUser.organization_id);
      }else{
        data =  await showCampaignPublic(id, link);
      }
      
      if (data) {
        setCampaign(data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement de la campagne:', error);
      window.location.href = '/';
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaign();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="pt-40">
        <Loading />
      </div>
    );
  }

  // Error state
  if (!campaign) {
    return (
      <div className="min-h-screen bg-base-200/50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-error mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Campagne introuvable</h1>
          <p className="text-base-content/70 mb-4">La campagne que vous recherchez n'existe pas.</p>
        </div>
      </div>
    );
  }

  // Calculs basés sur les données de la campagne
  const daysRemaining = getDaysRemaining(campaign.closing_date ?? "");
  const totalPositions = campaign.campaign_profiles
  ? campaign.campaign_profiles.reduce((sum, p) => sum + (p.positions_available || 0), 0)
  : 0
  return (
    <div className="min-h-screen bg-base-200/50">
      <div className="bg-base-100 border-b border-base-300">
        <div className={`container mx-auto px-4 py-6 pt-10`}>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-base-content">{campaign.title}</h1>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(campaign.status!)}`}>
                  {getStatusText(campaign.status!)}
                </span>
              </div>
              <p className="text-base-content/70">{campaign.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
           <div className="card bg-base-100 shadow-sm border border-base-300">
            <div className="card-body">
              <h2 className="card-title text-lg mb-4">
                <FileText className="w-5 h-5 text-primary" />
                Informations générales
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Date d'ouverture</p>
                      <p className="text-sm text-base-content/70">
                        {formatDate(campaign.opening_date!)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-accent" />
                    <div>
                      <p className="font-medium">Date de clôture</p>
                      <p className="text-sm text-base-content/70">
                        {formatDate(campaign.closing_date!)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-secondary" />
                    <div>
                      <p className="font-medium">Postes disponibles</p>
                      <p className="text-sm text-base-content/70">
                        {totalPositions} poste{totalPositions > 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>


                  {(campaign.max_application > 0) && (
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Dossiers maximum</p>
                        <p className="text-sm text-base-content/70">
                          {campaign.max_application} dossier{campaign.max_application > 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>


            {/* Processus de sélection */}
            <div className="card bg-base-100 shadow-sm border border-base-300">
              <div className="card-body">
                <h2 className="card-title text-lg mb-4">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  Processus de sélection
                </h2>
                
                <div className="space-y-4">
                  <div className="alert alert-info">
                    <AlertCircle className="w-5 h-5" />
                    <span>Ce processus de recrutement comprend plusieurs étapes :</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-base-200/50 rounded-lg">
                      <div className="w-8 h-8 bg-primary text-primary-content rounded-full flex items-center justify-center text-sm font-bold">
                        1
                      </div>
                      <div>
                        <p className="font-medium">Dépôt de candidature</p>
                        <p className="text-sm text-base-content/70">Soumission du dossier de candidature</p>
                      </div>
                    </div>
                    
                    {campaign.has_writen_test && (
                      <div className="flex items-center gap-3 p-3 bg-base-200/50 rounded-lg">
                        <div className="w-8 h-8 bg-secondary text-secondary-content rounded-full flex items-center justify-center text-sm font-bold">
                          2
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-secondary" />
                          <div>
                            <p className="font-medium">Test écrit</p>
                            <p className="text-sm text-base-content/70">Évaluation des compétences techniques</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {campaign.has_interview && (
                      <div className="flex items-center gap-3 p-3 bg-base-200/50 rounded-lg">
                        <div className="w-8 h-8 bg-accent text-accent-content rounded-full flex items-center justify-center text-sm font-bold">
                          {campaign.has_writen_test ? "3" : "2"}
                        </div>
                        <div className="flex items-center gap-2">
                          <MessageCircle className="w-4 h-4 text-accent" />
                          <div>
                            <p className="font-medium">Entretien</p>
                            <p className="text-sm text-base-content/70">Entretien avec l'équipe de recrutement</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Profils recherchés */}
            <div className="card bg-base-100 shadow-sm border border-base-300">
              <div className="card-body">
                <h2 className="card-title text-lg mb-4">
                  <Users className="w-5 h-5 text-primary" />
                  Profils recherchés
                </h2>
                
                <div className="space-y-4">
                  {campaign.campaign_profiles?.map((profile) => (
                    <div key={profile.id} className="border border-base-300 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-base-content">{profile.name}</h3>
                        <span className="badge badge-primary badge-sm">
                          {profile.positions_available} poste{profile.positions_available > 1 ? "s" : ""}
                        </span>
                      </div>
                      <p className="text-sm text-base-content/70">{profile.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-sm border border-base-300">
              <div className="card-body">
                <h2 className="card-title text-lg mb-4">
                  <ExternalLink className="w-5 h-5 text-primary" />
                  Lien officiel
                </h2>
                
                <div className="flex items-center gap-3 p-3 bg-base-200/50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-base-content/70 mb-1">Publication officielle</p>
                    <p className="text-sm text-primary truncate" title={campaign.publication_link}>
                      {campaign.publication_link}
                    </p>
                  </div>
                  <a 
                    href={campaign.publication_link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-ghost btn-sm"
                    title="Ouvrir dans un nouvel onglet"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>           
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              <div className="card bg-base-100 shadow-sm border border-base-300">
                <div className="card-body">
                  <h3 className="card-title text-base mb-4">Statistiques</h3>
                  
                  <div className="space-y-4">
                    <div className="stat p-3 bg-base-200/50 rounded-lg">
                      <div className="stat-title text-xs">Temps restant</div>
                      <div className="stat-value text-lg text-accent">
                        {daysRemaining > 0 ? `${daysRemaining} jour${daysRemaining > 1 ? "s" : ""}` : "Clôturée"}
                      </div>
                    </div>
                    
                    <div className="stat p-3 bg-base-200/50 rounded-lg">
                      <div className="stat-title text-xs">Candidatures</div>
                      <div className="stat-value text-lg text-primary">
                        {campaign.candidate_applications?.length || 0}
                      </div>
                    </div>
                    
                    <div className="stat p-3 bg-base-200/50 rounded-lg">
                      <div className="stat-title text-xs">Postes totaux</div>
                      <div className="stat-value text-lg text-secondary">
                        {totalPositions}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CandidateApplicationsTable candidate_applications={campaign.candidate_applications!} refresh={fetchCampaign} />

    </div>
  );
};

export default CampaignAdminShow;