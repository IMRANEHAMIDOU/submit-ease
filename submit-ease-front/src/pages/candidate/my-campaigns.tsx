import { Calendar, Eye, FileText, MessageCircle, Clock, CheckCircle, XCircle, AlertCircle, Award } from 'lucide-react';
import { useState } from 'react';
import type { CandidateApplicationType } from '../../types/type';
import { formatDate } from '../../utils/utils';

// Données de test
const mockApplications: CandidateApplicationType[] = [
  {
    id: 1,
    registration_number: "REG-2024-001",
    user_id: 1,
    campaign_id: 1,
    campaign_profile_id: 1,
    organization_id: 1,
    application_status: "en_attente",
    application_score: 85,
    writen_test_average: 78,
    interview_test_authorized: true,
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-01-20T14:22:00Z",
    campaign: {
      id: 1,
      title: "Développeur Full Stack Senior",
      description: "Rejoignez notre équipe de développement pour créer des applications web innovantes.",
      has_writen_test: true,
      has_interview: true,
      opening_date: "2024-01-10",
      closing_date: "2024-02-15",
      is_application_limited: true,
      max_application: 50,
      organization_id: 1,
      status: "active"
    },
    campaign_profile: {
      id: 1,
      name: "Développeur Senior",
      description: "Poste de développeur senior avec 5+ ans d'expérience",
      positions_available: 3
    },
    organization: {
      id: 1,
      name: "TechCorp Solutions",
      description: "Entreprise spécialisée dans le développement logiciel",
      logo: "https://via.placeholder.com/40x40",
      city: "Paris",
      country: "France"
    }
  },
  {
    id: 2,
    registration_number: "REG-2024-002",
    user_id: 1,
    campaign_id: 2,
    campaign_profile_id: 2,
    organization_id: 2,
    application_status: "accepte",
    application_score: 92,
    writen_test_average: 88,
    interview_test_authorized: true,
    created_at: "2024-01-08T09:15:00Z",
    updated_at: "2024-01-25T16:45:00Z",
    campaign: {
      id: 2,
      title: "Chef de Projet Digital",
      description: "Pilotez des projets digitaux innovants au sein d'une équipe dynamique.",
      has_writen_test: true,
      has_interview: true,
      opening_date: "2024-01-05",
      closing_date: "2024-02-05",
      is_application_limited: false,
      max_application: 100,
      organization_id: 2,
      status: "closed"
    },
    campaign_profile: {
      id: 2,
      name: "Chef de Projet",
      description: "Gestionnaire de projets avec expertise technique",
      positions_available: 2
    },
    organization: {
      id: 2,
      name: "Digital Innovations",
      description: "Agence digitale créative",
      logo: "https://via.placeholder.com/40x40",
      city: "Lyon",
      country: "France"
    }
  },
  {
    id: 3,
    registration_number: "REG-2024-003",
    user_id: 1,
    campaign_id: 3,
    campaign_profile_id: 3,
    organization_id: 3,
    application_status: "refuse",
    status_reason: "Profil ne correspondant pas aux critères techniques requis",
    application_score: 65,
    writen_test_average: 62,
    interview_test_authorized: false,
    created_at: "2024-01-12T11:20:00Z",
    updated_at: "2024-01-18T13:30:00Z",
    campaign: {
      id: 3,
      title: "Analyste Data Science",
      description: "Analysez et exploitez les données pour générer des insights business.",
      has_writen_test: true,
      has_interview: false,
      opening_date: "2024-01-01",
      closing_date: "2024-01-31",
      is_application_limited: true,
      max_application: 25,
      organization_id: 3,
      status: "active"
    },
    campaign_profile: {
      id: 3,
      name: "Data Scientist",
      description: "Spécialiste en analyse de données",
      positions_available: 1
    },
    organization: {
      id: 3,
      name: "DataTech Analytics",
      description: "Société spécialisée en analyse de données",
      logo: "https://via.placeholder.com/40x40",
      city: "Marseille",
      country: "France"
    }
  }
];

const CandidateApplicationsPage = () => {
  const [selectedApplication, setSelectedApplication] = useState<CandidateApplicationType | null>(null);
  const [applications] = useState<CandidateApplicationType[]>(mockApplications);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'accepte':
        return 'bg-success/10 text-success border-success/30';
      case 'refuse':
        return 'bg-error/10 text-error border-error/30';
      case 'en_attente':
        return 'bg-warning/10 text-warning border-warning/30';
      default:
        return 'bg-base-300/10 text-base-content border-base-300/30';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'accepte':
        return 'Accepté';
      case 'refuse':
        return 'Refusé';
      case 'en_attente':
        return 'En attente';
      default:
        return 'Inconnu';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepte':
        return <CheckCircle className="w-4 h-4" />;
      case 'refuse':
        return <XCircle className="w-4 h-4" />;
      case 'en_attente':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const ApplicationCard = ({ application }: { application: CandidateApplicationType }) => (
    <div className="group bg-base-100 rounded-2xl shadow-sm border border-base-300 hover:shadow-xl hover:border-primary/30 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      <div className="bg-gradient-to-r from-primary via-secondary to-accent p-6 text-primary-content relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2 leading-tight">{application.campaign?.title}</h3>
            <p className="text-primary-content/80 text-sm opacity-90">
              {application.organization?.name}
            </p>
          </div>
          <div className="ml-4 flex flex-col items-end gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusStyle(application.application_status)}`}>
              {getStatusIcon(application.application_status)}
              {getStatusText(application.application_status)}
            </span>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-base-200/50 rounded-xl p-4 hover:bg-primary/10 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-xs text-base-content/60">Score</span>
            </div>
            <p className="text-2xl font-bold text-base-content">{application.application_score}</p>
          </div>
          <div className="bg-base-200/50 rounded-xl p-4 hover:bg-secondary/10 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-secondary" />
              <span className="text-xs text-base-content/60">Soumis le</span>
            </div>
            <p className="text-sm font-bold text-base-content">
              {formatDate(application.created_at)}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {application.campaign?.has_writen_test && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-success/10 text-success rounded-full text-xs font-medium border border-success/30">
              <FileText className="w-3 h-3" />
              Test écrit
            </span>
          )}
          {application.campaign?.has_interview && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-warning/10 text-warning rounded-full text-xs font-medium border border-warning/30">
              <MessageCircle className="w-3 h-3" />
              Entretien
            </span>
          )}
        </div>

        <button 
          onClick={() => setSelectedApplication(application)}
          className="w-full btn btn-primary rounded-xl font-medium transition-all duration-200 hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2"
        >
          <Eye className="w-4 h-4" />
          Voir les détails
        </button>
      </div>
    </div>
  );

  const ApplicationDetails = ({ application }: { application: CandidateApplicationType }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-base-100 rounded-2xl shadow-2xl border border-base-300 max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-r from-primary via-secondary to-accent p-6 text-primary-content">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">{application.campaign?.title}</h2>
              <p className="text-primary-content/80">
                {application.organization?.name} • {application.campaign_profile?.name}
              </p>
            </div>
            <button
              onClick={() => setSelectedApplication(null)}
              className="btn btn-sm btn-ghost text-primary-content hover:bg-white/20"
            >
              ✕
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusStyle(application.application_status)}`}>
              {getStatusIcon(application.application_status)}
              {getStatusText(application.application_status)}
            </span>
            <span className="text-xs text-primary-content/70">
              #{application.registration_number}
            </span>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-base-200/30 rounded-xl p-4">
                <h3 className="font-semibold text-base-content mb-3">Scores d'évaluation</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-base-content/60">Score global</span>
                    <span className="font-bold text-lg text-primary">{application.application_score}/100</span>
                  </div>
                  {application.writen_test_average && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-base-content/60">Test écrit</span>
                      <span className="font-bold text-lg text-secondary">{application.writen_test_average}/100</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-base-content/60">Entretien autorisé</span>
                    <span className={`font-bold text-lg ${application.interview_test_authorized ? 'text-success' : 'text-error'}`}>
                      {application.interview_test_authorized ? 'Oui' : 'Non'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-base-200/30 rounded-xl p-4">
                <h3 className="font-semibold text-base-content mb-3">Informations campagne</h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-base-content/60">Postes disponibles</span>
                    <p className="font-medium">{application.campaign_profile?.positions_available}</p>
                  </div>
                  <div>
                    <span className="text-sm text-base-content/60">Limite candidatures</span>
                    <p className="font-medium">{application.campaign?.max_application}</p>
                  </div>
                  <div>
                    <span className="text-sm text-base-content/60">Date limite</span>
                    <p className="font-medium">{formatDate(application.campaign!.closing_date!)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-base-200/30 rounded-xl p-4">
              <h3 className="font-semibold text-base-content mb-3">Description du poste</h3>
              <p className="text-base-content/80 leading-relaxed">{application.campaign?.description}</p>
            </div>

            <div className="bg-base-200/30 rounded-xl p-4">
              <h3 className="font-semibold text-base-content mb-3">Profil recherché</h3>
              <p className="text-base-content/80 leading-relaxed">{application.campaign_profile?.description}</p>
            </div>

            {application.status_reason && (
              <div className="bg-error/10 border border-error/30 rounded-xl p-4">
                <h3 className="font-semibold text-error mb-2">Raison du statut</h3>
                <p className="text-error/80">{application.status_reason}</p>
              </div>
            )}

            <div className="bg-base-200/30 rounded-xl p-4">
              <h3 className="font-semibold text-base-content mb-3">Chronologie</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <div>
                    <p className="font-medium text-sm">Candidature soumise</p>
                    <p className="text-xs text-base-content/60">{formatDate(application.created_at)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-secondary"></div>
                  <div>
                    <p className="font-medium text-sm">Dernière mise à jour</p>
                    <p className="text-xs text-base-content/60">{formatDate(application.updated_at)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-base-200/30 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-base-content mb-2">Mes Candidatures</h1>
          <p className="text-base-content/60">Suivez l'évolution de vos candidatures en temps réel</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((application) => (
            <ApplicationCard key={application.id} application={application} />
          ))}
        </div>

        {applications.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-base-content/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-base-content mb-2">Aucune candidature</h3>
            <p className="text-base-content/60">Vous n'avez pas encore soumis de candidature.</p>
          </div>
        )}
      </div>

      {selectedApplication && (
        <ApplicationDetails application={selectedApplication} />
      )}
    </div>
  );
};

export default CandidateApplicationsPage;