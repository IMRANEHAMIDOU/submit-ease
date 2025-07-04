import type { CandidateApplicationType } from '../../../types/type';
import { Calendar, Mail, Phone, User } from 'lucide-react';
import { formatDate } from '../../../utils/utils';

const CandidateApplicationSow = ({ application, onClose }: { application: CandidateApplicationType, onClose: (v: boolean) => void }) => {
  
  const getStatusBadge = (status: string) => {
    const statusStyles = {
      pending: "badge-warning",
      accepted: "badge-success",
      rejected: "badge-error"
    };
    
    const statusTexts = {
      pending: "En attente",
      accepted: "Acceptée",
      rejected: "Rejetée"
    };
    
    return {
      style: statusStyles[status] || "badge-neutral",
      text: statusTexts[status] || "Inconnu"
    };
  };

  // Fonction pour formater la valeur d'un champ checkbox/radio
  const formatOptionValue = (responseValue: string, fieldOptions?: string | null) => {
    if (!fieldOptions) return responseValue;

    let parsedValue: string[] = [];
    try {
      parsedValue = JSON.parse(responseValue);
    } catch (e) {
      parsedValue = [responseValue];
    }

    let options = [];
    try {
      options = JSON.parse(fieldOptions);
    } catch (e) {
      return responseValue;
    }

    if (Array.isArray(options)) {
      return parsedValue
        .map((val) => {
          const opt = options.find((o: any) => o.value === val);
          return opt ? opt.label : val;
        })
        .join(", ");
    }

    return responseValue;
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <h3 className="font-bold text-lg mb-4">Détails de la candidature</h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Informations personnelles */}
            <div>
              <h4 className="font-semibold mb-2">Informations personnelles</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{application.user?.first_name} {application.user?.last_name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{application.user?.email}</span>
                </div>
                {application.user?.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>{application.user?.phone}</span>
                  </div>
                )}
                {application.user?.birth_date && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(application.user?.birth_date)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Informations candidature */}
            <div>
              <h4 className="font-semibold mb-2">Candidature</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Statut : </span>
                  <span className={`badge ${getStatusBadge(application.application_status).style} badge-sm`}>
                    {getStatusBadge(application.application_status).text}
                  </span>
                </div>
                {application.application_score !== null && (
                  <div>
                    <span className="font-medium">Note dossier : </span>
                    <span>{application.application_score}/10</span>
                  </div>
                )}
                <div>
                  <span className="font-medium">Déposée le : </span>
                  <span>{formatDate(application.created_at)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Note Test écrit */}
          {application.writen_test_average !== undefined && (
            <div>
              <h4 className="font-semibold mb-2">Note test écrit</h4>
              <p className="text-sm bg-base-200 p-3 rounded">{application.writen_test_average}</p>
            </div>
          )}

          {/* Réponses du formulaire */}
          {application.application_responses && application.application_responses.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">Réponses supplémentaires</h4>
              <div className="space-y-3 text-sm">
                {application.application_responses.map((resp) => {
                  const field = resp.campaign_field;
                  let value = resp.response_value;

                  if (field?.field_type === "checkbox" || field?.field_type === "radio") {
                    value = formatOptionValue(resp.response_value, field.options);
                  }

                  return (
                    <div key={resp.id} className="bg-base-200 p-3 rounded">
                      <p className="font-medium">{field?.label}</p>
                      <p className="text-base-content/70 break-words">{value}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="modal-action">
          <button
            className="btn"
            onClick={() => onClose(false)}
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateApplicationSow;
