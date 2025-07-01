import { useState } from 'react';
import type { CompagnType } from '../../types/type';
import { ChevronRight, Calendar, Users, FileText, MessageCircle, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Campaigns = () => {
  // Données fictives des campagnes adaptées aux nouveaux types
  const [campaigns] = useState<CompagnType[]>([
    {
      id: 1,
      title: 'Campagne de recrutement - Développeur Front-End',
      description: 'Recrutement pour un poste de développeur Front-End avec expérience en React et TypeScript. Rejoignez notre équipe dynamique pour travailler sur des projets innovants.',
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
          description: 'Développeur avec 5+ ans d\'expérience en React',
          positions_available: 2
        },
        {
          id: 2,
          name: 'Développeur Frontend Junior',
          description: 'Développeur débutant avec bases solides en JavaScript',
          positions_available: 3
        }
      ],
      fields: [
        {
          id: 1,
          label: 'Années d\'expérience',
          description: 'Nombre d\'années d\'expérience en développement',
          field_type: 'number',
          options: '',
          is_required: true
        },
        {
          id: 2,
          label: 'Technologies maîtrisées',
          description: 'Liste des technologies que vous maîtrisez',
          field_type: 'multiselect',
          options: 'React,Vue.js,Angular,TypeScript,JavaScript',
          is_required: true
        }
      ]
    },
    {
      id: 2,
      title: 'Campagne de recrutement - Analyste Marketing Digital',
      description: 'Recrutement pour un poste d\'analyste marketing digital avec expérience en analyse de données et stratégies digitales.',
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
          description: 'Analyste avec expertise en Google Analytics et SEO',
          positions_available: 1
        }
      ],
      fields: [
        {
          id: 3,
          label: 'Formation académique',
          description: 'Votre niveau d\'études',
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
          is_required: false
        }
      ]
    },
    {
      id: 3,
      title: 'Campagne de recrutement - Gestionnaire de projet',
      description: 'Recrutement pour un poste de gestionnaire de projet avec une solide expérience dans la gestion d\'équipes et méthodologies agiles.',
      has_writen_test: true,
      has_interview: true,
      opening_date: '2025-07-10',
      closing_date: '2025-08-10',
      is_application_limited: true,
      max_application: 30,
      status: 0,
      organization_id: 3,
      publication_link: 'https://example.com/campaign-3',
      profiles: [
        {
          id: 4,
          name: 'Chef de projet IT',
          description: 'Gestionnaire de projets technologiques',
          positions_available: 1
        },
        {
          id: 5,
          name: 'Scrum Master',
          description: 'Expert en méthodologies agiles',
          positions_available: 2
        }
      ],
      fields: [
        {
          id: 5,
          label: 'Certifications',
          description: 'Certifications en gestion de projet',
          field_type: 'multiselect',
          options: 'PMP,Scrum Master,PRINCE2,Agile',
          is_required: false
        },
        {
          id: 6,
          label: 'Taille d\'équipe gérée',
          description: 'Nombre maximum de personnes gérées',
          field_type: 'number',
          options: '',
          is_required: true
        }
      ]
    },
  ]);

  // Fonction pour formater les dates
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Fonction pour obtenir le statut avec style
  const getStatusBadge = (status: number) => {
    if (status === 1) {
      return (
        <div className="badge badge-success gap-1">
          <CheckCircle className="w-3 h-3" />
          Active
        </div>
      );
    } else {
      return (
        <div className="badge badge-warning gap-1">
          <AlertCircle className="w-3 h-3" />
          Inactive
        </div>
      );
    }
  };

  // Fonction pour calculer les jours restants
  const getDaysRemaining = (closingDate: string) => {
    const today = new Date();
    const endDate = new Date(closingDate);
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-base-100 text-base-content transition-colors pt-20">
      <section className="py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-center mb-4">
              Campagnes de <span className="text-accent">Recrutement</span>
            </h1>
            <p className="text-center text-base-content/70 max-w-2xl mx-auto">
              Découvrez nos opportunités de carrière et postulez aux postes qui correspondent à votre profil
            </p>
          </div>

          {/* Grille des campagnes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign) => {
              const daysRemaining = getDaysRemaining(campaign.closing_date);
              const totalPositions = campaign.profiles.reduce((sum, profile) => sum + profile.positions_available, 0);
              
              return (
                <div key={campaign.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 border border-base-200">
                  <div className="card-body">
                    {/* Header avec statut */}
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="card-title text-lg leading-tight flex-1 mr-2">
                        {campaign.title}
                      </h3>
                      {getStatusBadge(campaign.status)}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-base-content/70 mb-4 line-clamp-3">
                      {campaign.description}
                    </p>

                    {/* Informations clés */}
                    <div className="space-y-2 mb-4">
                      {/* Postes disponibles */}
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-primary" />
                        <span>{totalPositions} poste{totalPositions > 1 ? 's' : ''} disponible{totalPositions > 1 ? 's' : ''}</span>
                      </div>

                      {/* Dates */}
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>Jusqu'au {formatDate(campaign.closing_date)}</span>
                      </div>

                      {/* Temps restant */}
                      {daysRemaining > 0 && (
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-accent" />
                          <span className="text-accent font-medium">
                            {daysRemaining} jour{daysRemaining > 1 ? 's' : ''} restant{daysRemaining > 1 ? 's' : ''}
                          </span>
                        </div>
                      )}

                      {/* Limitation des candidatures */}
                      {campaign.is_application_limited && (
                        <div className="flex items-center gap-2 text-sm">
                          <FileText className="w-4 h-4 text-warning" />
                          <span>Limité à {campaign.max_application} candidatures</span>
                        </div>
                      )}
                    </div>

                    {/* Badges des processus */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {campaign.has_writen_test && (
                        <div className="badge badge-info badge-sm">
                          <FileText className="w-3 h-3 mr-1" />
                          Test écrit
                        </div>
                      )}
                      {campaign.has_interview && (
                        <div className="badge badge-secondary badge-sm">
                          <MessageCircle className="w-3 h-3 mr-1" />
                          Entretien
                        </div>
                      )}
                    </div>

                    {/* Profils recherchés */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold mb-2">Profils recherchés:</h4>
                      <div className="space-y-1">
                        {campaign.profiles.slice(0, 2).map((profile) => (
                          <div key={profile.id} className="text-xs text-base-content/60">
                            • {profile.name} ({profile.positions_available} poste{profile.positions_available > 1 ? 's' : ''})
                          </div>
                        ))}
                        {campaign.profiles.length > 2 && (
                          <div className="text-xs text-accent">
                            +{campaign.profiles.length - 2} autre{campaign.profiles.length - 2 > 1 ? 's' : ''} profil{campaign.profiles.length - 2 > 1 ? 's' : ''}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="card-actions justify-between items-center">
                      <Link 
                        to={`/campaigns/${campaign.id}`} 
                        className="btn btn-primary btn-sm flex-1"
                        //disabled={campaign.status === 0 || daysRemaining < 0}
                      >
                        {campaign.status === 0 ? 'Campagne fermée' : 
                         daysRemaining < 0 ? 'Expiré' : 'Postuler'}
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Message si aucune campagne */}
          {campaigns.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2">Aucune campagne disponible</h3>
              <p className="text-base-content/70">Revenez bientôt pour découvrir de nouvelles opportunités !</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Campaigns;