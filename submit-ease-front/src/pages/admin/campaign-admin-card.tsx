import { Calendar, Copy, Edit3, ExternalLink, Eye, FileText, MessageCircle, Trash2, Users } from 'lucide-react';
import type { CampaignType } from '../../types/type';
import { Link } from 'react-router-dom';
import { formatDate, getStatusStyle, getStatusText } from '../../utils/utils';

const CampaignAdminCard = ({ campaign, confirmDelete , onEdit}: { campaign: CampaignType, confirmDelete: (campaign: CampaignType)=>void , onEdit: (campaign: CampaignType)=>void}) => {


    const copyToClipboard = (text  : string) => {
      navigator.clipboard.writeText(text).then(() => {
        //console.log('Lien copié !');
      }).catch(err => {
        console.error('Erreur lors de la copie:', err);
      });
    };


    return (
      <div className="group bg-base-100 rounded-2xl shadow-sm border border-base-300 hover:shadow-xl hover:border-primary/30 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
        <div className="bg-gradient-to-r from-primary via-secondary to-accent p-6 text-primary-content relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 flex justify-between items-start mb-3">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2 leading-tight">{campaign.title}</h3>
              <p className="text-primary-content/80 text-sm opacity-90 line-clamp-2">{campaign.description}</p>
            </div>
            <div className="ml-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium border ${
                  getStatusStyle(campaign.status!)
                }`}
              >
                {getStatusText(campaign.status!) }
              </span>
            </div>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-base-200/50 rounded-xl p-4 hover:bg-primary/10 transition-colors flex items-center gap-3">
              <Users className="w-5 h-5 text-primary" />
              <div>
                <p className="text-2xl font-bold text-base-content">{campaign.candidate_applications?.length}</p>
                <p className="text-xs text-base-content/60">Candidatures</p>
              </div>
            </div>
            <div className="bg-base-200/50 rounded-xl p-4 hover:bg-secondary/10 transition-colors flex items-center gap-3">
              <Calendar className="w-5 h-5 text-secondary" />
              <div>
                <p className="text-2xl font-bold text-base-content">
                  {Math.max(
                    0,
                    Math.ceil((new Date(campaign.closing_date!).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                  )}
                </p>
                <p className="text-xs text-base-content/60">Jours restants</p>
              </div>
            </div>
            <div className="bg-base-200/50 rounded-xl p-4 hover:bg-secondary/10 transition-colors flex items-center gap-3">
              <Calendar className="w-5 h-5 text-secondary" />
              <div>
                <p className="text-2xl font-bold text-base-content">
                  {campaign.max_application}
                </p>
                <p className="text-xs text-base-content/60">Max Dossier</p>
              </div>
            </div>
          </div>


          <div className="flex flex-wrap gap-2 mb-6">
            {campaign.has_writen_test && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-success/10 text-success rounded-full text-xs font-medium border border-success/30">
                <FileText className="w-3 h-3" />
                Test écrit
              </span>
            )}
            {campaign.has_interview && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-warning/10 text-warning rounded-full text-xs font-medium border border-warning/30">
                <MessageCircle className="w-3 h-3" />
                Entretien
              </span>
            )}
            {campaign.is_application_limited && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-error/10 text-error rounded-full text-xs font-medium border border-error/30">
                <Users className="w-3 h-3" />
                Limité
              </span>
            )}
          </div>

          {/** lien de plublication */}
          <div className="bg-base-200/30 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-base-content/60 mb-1 text-sm">Lien de publication</p>
                <p className="font-medium text-base-content truncate" title={campaign.publication_link}>
                  {location.host+':/c/'+campaign.publication_link}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => copyToClipboard(location.host+':/c/'+campaign.publication_link!)}
                  className="btn btn-ghost btn-sm rounded-lg hover:bg-primary/10 transition-colors flex items-center justify-center"
                  title="Copier le lien"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <a
                  href={`/c/${campaign.publication_link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-sm rounded-lg hover:bg-primary/10 transition-colors flex items-center justify-center"
                  title="Ouvrir dans un nouvel onglet"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-base-200/30 rounded-xl p-4 mb-6 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-base-content/60 mb-1">Ouverture</p>
              <p className="font-medium text-base-content">{formatDate(campaign.opening_date!)}</p>
            </div>
            <div>
              <p className="text-base-content/60 mb-1">Fermeture</p>
              <p className="font-medium text-base-content">{formatDate(campaign.closing_date!)}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Link to={'/admin/campaigns/'+campaign.id} className="flex-1 btn btn-primary rounded-xl font-medium transition-all duration-200 hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2">
              <Eye className="w-4 h-4" />
              Voir
            </Link>
            <button onClick={()=>onEdit(campaign)} className="flex-1 btn btn-outline rounded-xl font-medium transition-all duration-200 hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2">
              <Edit3 className="w-4 h-4" />
              Modifier
            </button>
            <button
              onClick={() => confirmDelete(campaign)}
              className="btn btn-outline btn-error rounded-xl font-medium transition-all duration-200 hover:shadow-lg transform hover:scale-105 flex items-center justify-center"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    )
}

export default CampaignAdminCard;
