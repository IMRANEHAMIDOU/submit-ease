import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Users, 
  FileText, 
  MessageCircle, 
  CheckCircle, 
  AlertCircle, 
  ExternalLink,
  Briefcase,
  Star,
  Shield,
  Target,
  Award
} from 'lucide-react';
import type { CompagnType } from '../../types/type';

const CampaignDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [campaign, setCampaign] = useState<CompagnType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<number | null>(null);

  // Données fictives enrichies
  const campaigns: CompagnType[] = [
    {
      id: 1,
      title: 'Campagne de recrutement - Développeur Front-End',
      description: 'Rejoignez notre équipe de développement pour créer des interfaces utilisateur exceptionnelles. Nous recherchons des développeurs passionnés par les technologies modernes et l\'expérience utilisateur. Vous travaillerez sur des projets innovants avec une stack technique de pointe.',
      has_writen_test: true,
      has_interview: true,
      opening_date: '2025-07-01',
      closing_date: '2025-08-01',
      is_application_limited: true,
      max_application: 50,
      status: 1,
      organization_id: 1,
      publication_link: 'https://example.com/campaign-1',
      profiles: [
        { 
          id: 1, 
          name: 'Développeur Frontend Senior', 
          description: 'Poste de développeur Front-End senior avec leadership technique et mentorat junior', 
          positions_available: 2 
        },
        { 
          id: 2, 
          name: 'Développeur Frontend Junior', 
          description: 'Poste parfait pour débuter sa carrière avec accompagnement et formation', 
          positions_available: 3 
        }
      ],
      fields: [
        { 
          id: 1, 
          label: 'Années d\'expérience', 
          description: 'Nombre d\'années d\'expérience en développement frontend', 
          field_type: 'number', 
          options: '', 
          is_required: true 
        },
        { 
          id: 2, 
          label: 'Portfolio', 
          description: 'Lien vers votre portfolio ou GitHub', 
          field_type: 'url', 
          options: '', 
          is_required: true 
        },
        { 
          id: 3, 
          label: 'Technologies maîtrisées', 
          description: 'Sélectionnez les technologies que vous maîtrisez', 
          field_type: 'multiselect', 
          options: 'React,Vue.js,Angular,TypeScript,JavaScript,CSS,SASS,Tailwind', 
          is_required: true 
        }
      ]
    },
    {
      id: 2,
      title: 'Campagne de recrutement - Analyste Marketing Digital',
      description: 'Nous recherchons un analyste marketing digital pour optimiser nos campagnes et analyser les performances. Vous serez au cœur de notre stratégie digitale et contribuerez à la croissance de nos activités en ligne.',
      has_writen_test: false,
      has_interview: true,
      opening_date: '2025-07-15',
      closing_date: '2025-08-15',
      is_application_limited: false,
      max_application: 0,
      status: 1,
      organization_id: 2,
      publication_link: 'https://example.com/campaign-2',
      profiles: [
        { 
          id: 3, 
          name: 'Analyste Marketing Senior', 
          description: 'Expert en analyse de données marketing avec vision stratégique', 
          positions_available: 1 
        },
        { 
          id: 4, 
          name: 'Analyste Marketing Junior', 
          description: 'Poste d\'entrée dans l\'analyse marketing digital', 
          positions_available: 2 
        }
      ],
      fields: [
        { 
          id: 3, 
          label: 'Formation', 
          description: 'Votre niveau de formation', 
          field_type: 'select', 
          options: 'Bac+2,Bac+3,Bac+5,Autres', 
          is_required: true 
        },
        { 
          id: 4, 
          label: 'Outils maîtrisés', 
          description: 'Outils d\'analyse que vous maîtrisez', 
          field_type: 'multiselect', 
          options: 'Google Analytics,Facebook Ads,Google Ads,SEMrush,Hootsuite', 
          is_required: true 
        }
      ]
    }
  ];

  useEffect(() => {
    if (id) {
      const foundCampaign = campaigns.find((c) => c.id.toString() === id);
      if (foundCampaign) {
        setCampaign(foundCampaign);
        setSelectedProfile(foundCampaign.profiles[0]?.id || null);
      } else {
        setError('Campagne non trouvée');
      }
    }
    setLoading(false);
  }, [id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getDaysRemaining = (closingDate: string) => {
    const today = new Date();
    const endDate = new Date(closingDate);
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusBadge = (status: number) => {
    if (status === 1) {
      return (
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/20 text-success rounded-full font-semibold">
          <CheckCircle className="w-5 h-5" />
          Campagne Active
        </div>
      );
    } else {
      return (
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-warning/20 text-warning rounded-full font-semibold">
          <AlertCircle className="w-5 h-5" />
          Campagne Fermée
        </div>
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="text-base-content/70">Chargement de la campagne...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold mb-2">Campagne introuvable</h2>
          <p className="text-base-content/70 mb-6">{error}</p>
          <Link to="/campaigns" className="btn btn-primary">
            <ArrowLeft className="w-4 h-4" />
            Retour aux campagnes
          </Link>
        </div>
      </div>
    );
  }

  if (!campaign) return null;

  const daysRemaining = getDaysRemaining(campaign.closing_date);
  const totalPositions = campaign.profiles.reduce((sum, profile) => sum + profile.positions_available, 0);
  const selectedProfileData = campaign.profiles.find(p => p.id === selectedProfile);

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200/50 to-base-100">
      {/* Header avec navigation */}
      <div className="bg-base-100/95 backdrop-blur-sm border-b border-base-300 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link 
            to="/campaigns" 
            className="inline-flex items-center gap-2 text-base-content/70 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux campagnes
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-8 mb-8">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="relative">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="flex-1">
                <h1 className="text-4xl lg:text-5xl font-bold text-base-content mb-4 leading-tight">
                  {campaign.title}
                </h1>
                <p className="text-lg text-base-content/80 max-w-3xl leading-relaxed">
                  {campaign.description}
                </p>
              </div>
              <div className="flex flex-col items-end gap-4">
                {getStatusBadge(campaign.status)}
                {daysRemaining > 0 && (
                  <div className="text-right">
                    <div className="text-2xl font-bold text-accent">{daysRemaining}</div>
                    <div className="text-sm text-base-content/70">
                      jour{daysRemaining > 1 ? 's' : ''} restant{daysRemaining > 1 ? 's' : ''}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-8">
            {/* Informations générales */}
            <div className="card bg-base-100 shadow-xl border border-base-200">
              <div className="card-body">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Target className="w-6 h-6 text-primary" />
                  Informations de la campagne
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-xl">
                      <Calendar className="w-5 h-5 text-primary" />
                      <div>
                        <div className="text-sm text-base-content/70">Date d'ouverture</div>
                        <div className="font-semibold">{formatDate(campaign.opening_date)}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-4 bg-accent/5 rounded-xl">
                      <Clock className="w-5 h-5 text-accent" />
                      <div>
                        <div className="text-sm text-base-content/70">Date de clôture</div>
                        <div className="font-semibold">{formatDate(campaign.closing_date)}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-secondary/5 rounded-xl">
                      <Users className="w-5 h-5 text-secondary" />
                      <div>
                        <div className="text-sm text-base-content/70">Postes disponibles</div>
                        <div className="font-semibold">{totalPositions} poste{totalPositions > 1 ? 's' : ''}</div>
                      </div>
                    </div>
                    
                    {campaign.is_application_limited && (
                      <div className="flex items-center gap-3 p-4 bg-warning/5 rounded-xl">
                        <Shield className="w-5 h-5 text-warning" />
                        <div>
                          <div className="text-sm text-base-content/70">Candidatures limitées</div>
                          <div className="font-semibold">{campaign.max_application} max</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Processus de recrutement */}
            <div className="card bg-base-100 shadow-xl border border-base-200">
              <div className="card-body">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Award className="w-6 h-6 text-secondary" />
                  Processus de recrutement
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`p-6 rounded-xl border-2 transition-all ${
                    campaign.has_writen_test 
                      ? 'border-info bg-info/5' 
                      : 'border-base-300 bg-base-200/50'
                  }`}>
                    <div className="flex items-center gap-3 mb-2">
                      <FileText className={`w-6 h-6 ${campaign.has_writen_test ? 'text-info' : 'text-base-content/40'}`} />
                      <h3 className="font-semibold">Test écrit</h3>
                    </div>
                    <p className="text-sm text-base-content/70">
                      {campaign.has_writen_test 
                        ? 'Un test technique sera requis pour évaluer vos compétences' 
                        : 'Aucun test écrit requis pour cette campagne'
                      }
                    </p>
                  </div>
                  
                  <div className={`p-6 rounded-xl border-2 transition-all ${
                    campaign.has_interview 
                      ? 'border-success bg-success/5' 
                      : 'border-base-300 bg-base-200/50'
                  }`}>
                    <div className="flex items-center gap-3 mb-2">
                      <MessageCircle className={`w-6 h-6 ${campaign.has_interview ? 'text-success' : 'text-base-content/40'}`} />
                      <h3 className="font-semibold">Entretien</h3>
                    </div>
                    <p className="text-sm text-base-content/70">
                      {campaign.has_interview 
                        ? 'Un entretien sera organisé avec l\'équipe de recrutement' 
                        : 'Aucun entretien prévu pour cette campagne'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Profils disponibles */}
            <div className="card bg-base-100 shadow-xl border border-base-200">
              <div className="card-body">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Briefcase className="w-6 h-6 text-accent" />
                  Profils recherchés
                </h2>
                
                <div className="tabs tabs-boxed mb-6">
                  {campaign.profiles.map((profile) => (
                    <button
                      key={profile.id}
                      className={`tab ${selectedProfile === profile.id ? 'tab-active' : ''}`}
                      onClick={() => setSelectedProfile(profile.id)}
                    >
                      {profile.name}
                    </button>
                  ))}
                </div>
                
                {selectedProfileData && (
                  <div className="p-6 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold mb-2">{selectedProfileData.name}</h3>
                        <p className="text-base-content/80">{selectedProfileData.description}</p>
                      </div>
                      <div className="badge badge-primary badge-lg">
                        {selectedProfileData.positions_available} poste{selectedProfileData.positions_available > 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Critères de candidature */}
            <div className="card bg-base-100 shadow-xl border border-base-200">
              <div className="card-body">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Star className="w-6 h-6 text-warning" />
                  Critères de candidature
                </h2>
                
                <div className="space-y-4">
                  {campaign.fields.map((field) => (
                    <div key={field.id} className="p-4 bg-base-200/50 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{field.label}</h3>
                        {field.is_required && (
                          <span className="badge badge-error badge-sm">Requis</span>
                        )}
                      </div>
                      <p className="text-sm text-base-content/70">{field.description}</p>
                      {field.options && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {field.options.split(',').map((option, idx) => (
                            <span key={idx} className="badge badge-outline badge-sm">
                              {option.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Card d'action */}
            <div className="card bg-gradient-to-br from-primary/10 to-secondary/10 shadow-xl border border-primary/20 sticky top-24">
              <div className="card-body text-center">
                <h3 className="text-xl font-bold mb-4">Prêt à postuler ?</h3>
                <p className="text-sm text-base-content/70 mb-6">
                  Ne manquez pas cette opportunité unique de rejoindre notre équipe !
                </p>
                
                <button 
                  className="btn btn-primary btn-lg w-full mb-4"
                  disabled={campaign.status === 0 || daysRemaining < 0}
                >
                  {campaign.status === 0 ? 'Campagne fermée' : 
                   daysRemaining < 0 ? 'Campagne expirée' : 'Postuler maintenant'}
                </button>
                
                {campaign.publication_link && (
                  <a 
                    href={campaign.publication_link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm w-full"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Voir l'annonce officielle
                  </a>
                )}
              </div>
            </div>

            {/* Statistiques rapides */}
            <div className="card bg-base-100 shadow-xl border border-base-200">
              <div className="card-body">
                <h3 className="font-bold mb-4">En bref</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-base-content/70">Postes</span>
                    <span className="font-semibold">{totalPositions}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-base-content/70">Durée</span>
                    <span className="font-semibold">{daysRemaining > 0 ? `${daysRemaining}j` : 'Expiré'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-base-content/70">Test</span>
                    <span className="font-semibold">{campaign.has_writen_test ? 'Oui' : 'Non'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-base-content/70">Entretien</span>
                    <span className="font-semibold">{campaign.has_interview ? 'Oui' : 'Non'}</span>
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

export default CampaignDetail;