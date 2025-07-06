import { Calendar, ChevronRight, Clock, FileText, MessageCircle, Users } from "lucide-react";
import type { CampaignType } from "../../types/type";
import { Link } from "react-router-dom";

const CampaignCard = ({ campaign }: { campaign: CampaignType }) => {

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getDaysRemaining = (closingDate: string) => {
    const today = new Date();
    const endDate = new Date(closingDate);
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = getDaysRemaining(campaign.closing_date ?? "");

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 border border-base-200">
      <div className="card-body">
        {/* Header avec titre */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="card-title text-lg leading-tight flex-1 mr-2">{campaign.title}</h3>
        </div>


        <p className="text-sm text-base-content/70 mb-4 line-clamp-3">{campaign.description}</p>

        <div className="space-y-2 mb-4">
         <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-primary" />
            <span>
                {campaign.campaign_profiles.reduce((sum, p) => sum + (p.positions_available || 0), 0)} poste
                {campaign.campaign_profiles.reduce((sum, p) => sum + (p.positions_available || 0), 0) > 1 ? "s" : ""} disponible
            </span>
        </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-primary" />
            <span>Jusqu'au {formatDate(campaign.closing_date ?? "")}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-accent" />
            <span className="text-accent font-medium">
              {daysRemaining > 0 ? `${daysRemaining} jour${daysRemaining > 1 ? "s" : ""} restant${daysRemaining > 1 ? "s" : ""}` : "Clôturée"}
            </span>
          </div>

          {campaign.is_application_limited && (
            <div className="flex items-center gap-2 text-sm">
              <FileText className="w-4 h-4 text-warning" />
              <span>Limité à {campaign.max_application} candidature{campaign.max_application && campaign.max_application > 1 ? "s" : ""}</span>
            </div>
          )}
        </div>

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

        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-2">Profils recherchés :</h4>
          <div className="space-y-1">
            {campaign.campaign_profiles.slice(0, 2).map((profile) => (
              <div key={profile.id} className="text-xs text-base-content/60">
                • {profile.name} ({profile.positions_available} poste{profile.positions_available > 1 ? "s" : ""})
              </div>
            ))}
            {campaign.campaign_profiles.length > 2 && (
              <div className="text-xs text-accent">
                +{campaign.campaign_profiles.length - 2} autre
                {campaign.campaign_profiles.length - 2 > 1 ? "s" : ""} profil
                {campaign.campaign_profiles.length - 2 > 1 ? "s" : ""}
              </div>
            )}
          </div>
        </div>

        {/* Action */}
        <div className="card-actions justify-between items-center">
          <Link to={`/c/${campaign.publication_link}`} className="btn btn-primary btn-sm flex-1">
            Voir plus et Postuler
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
