import type { CandidateApplicationType } from '../../types/type';
import { Calendar, Mail, Phone, User, Download, Eye, FileText, Image, Save } from 'lucide-react';
import { formatDate } from '../../utils/utils';
import { useState } from 'react';

const CandidateApplicationShow = ({ 
  application, 
  onClose 
}: { 
  application: CandidateApplicationType, 
  onClose: (v: boolean) => void 
}) => {
  
  const [formData, setFormData] = useState({
    application_status: application.application_status,
    status_reason: application.status_reason || '',
    application_score: application.application_score,
    writen_test_average: application.writen_test_average || 0,
    interview_test_authorized: application.interview_test_authorized
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Ici vous pouvez appeler votre API pour sauvegarder les changements
    console.log('Données à sauvegarder:', formData);
    // Exemple d'appel API:
    // updateCandidateApplication(application.id, formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      application_status: application.application_status,
      status_reason: application.status_reason || '',
      application_score: application.application_score,
      writen_test_average: application.writen_test_average || 0,
      interview_test_authorized: application.interview_test_authorized
    });
    setIsEditing(false);
  };
  
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
      style: statusStyles[status as keyof typeof statusStyles] || "badge-neutral",
      text: statusTexts[status as keyof typeof statusTexts] || "Inconnu"
    };
  };

  // Fonction pour détecter et traiter les fichiers base64
  const isBase64File = (value: string): boolean => {
    return value.startsWith('data:');
  };

  // Fonction pour extraire les informations du fichier base64
  const getFileInfo = (base64String: string) => {
    const [metadata, data] = base64String.split(',');
    const mimeType = metadata.match(/data:([^;]+)/)?.[1] || '';
    const isImage = mimeType.startsWith('image/');
    const isPdf = mimeType === 'application/pdf';
    
    return {
      mimeType,
      isImage,
      isPdf,
      data: base64String
    };
  };

  // Composant pour afficher un fichier
  const FileViewer = ({ base64String, fileName }: { base64String: string, fileName?: string }) => {
    const fileInfo = getFileInfo(base64String);
    
    const downloadFile = () => {
      const link = document.createElement('a');
      link.href = base64String;
      link.download = fileName || `fichier.${fileInfo.mimeType.split('/')[1]}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    const viewFile = () => {
      window.open(base64String, '_blank');
    };

    if (fileInfo.isImage) {
      return (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Image className="w-4 h-4" />
            <span className="text-sm font-medium">Image</span>
          </div>
          <div className="border rounded p-2">
            <img 
              src={base64String} 
              alt="Fichier joint" 
              className="max-w-full max-h-48 object-contain rounded"
            />
          </div>
          <div className="flex gap-2">
            <button 
              onClick={viewFile}
              className="btn btn-sm btn-outline"
            >
              <Eye className="w-4 h-4" />
              Voir
            </button>
            <button 
              onClick={downloadFile}
              className="btn btn-sm btn-outline"
            >
              <Download className="w-4 h-4" />
              Télécharger
            </button>
          </div>
        </div>
      );
    }

    if (fileInfo.isPdf) {
      return (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span className="text-sm font-medium">Document PDF</span>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={viewFile}
              className="btn btn-sm btn-outline"
            >
              <Eye className="w-4 h-4" />
              Voir le PDF
            </button>
            <button 
              onClick={downloadFile}
              className="btn btn-sm btn-outline"
            >
              <Download className="w-4 h-4" />
              Télécharger
            </button>
          </div>
        </div>
      );
    }

    // Autres types de fichiers
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4" />
          <span className="text-sm font-medium">
            Fichier ({fileInfo.mimeType})
          </span>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={viewFile}
            className="btn btn-sm btn-outline"
          >
            <Eye className="w-4 h-4" />
            Ouvrir
          </button>
          <button 
            onClick={downloadFile}
            className="btn btn-sm btn-outline"
          >
            <Download className="w-4 h-4" />
            Télécharger
          </button>
        </div>
      </div>
    );
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
      <div className="modal-box max-w-4xl max-h-[90vh] overflow-y-auto">
        <h3 className="font-bold text-lg mb-4">Détails de la candidature</h3>
        
        <div className="space-y-6">
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
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">Candidature</h4>
                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="btn btn-success btn-sm"
                      >
                        <Save className="w-4 h-4" />
                        Sauvegarder
                      </button>
                      <button
                        onClick={handleCancel}
                        className="btn btn-ghost btn-sm"
                      >
                        Annuler
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="btn btn-outline btn-sm"
                    >
                      Modifier
                    </button>
                  )}
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium">Numéro : </span>
                  <span className="font-mono">{application.registration_number}</span>
                </div>
                
                <div>
                  <label className="font-medium block mb-1">Statut :</label>
                  {isEditing ? (
                    <select
                      value={formData.application_status}
                      onChange={(e) => handleInputChange('application_status', e.target.value)}
                      className="select select-bordered select-sm w-full max-w-xs"
                    >
                      <option value="pending">En attente</option>
                      <option value="accepted">Acceptée</option>
                      <option value="rejected">Rejetée</option>
                    </select>
                  ) : (
                    <span className={`badge ${getStatusBadge(formData.application_status).style} badge-sm`}>
                      {getStatusBadge(formData.application_status).text}
                    </span>
                  )}
                </div>

                <div>
                  <label className="font-medium block mb-1">Note dossier (/10) :</label>
                  {isEditing ? (
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.1"
                      value={formData.application_score}
                      onChange={(e) => handleInputChange('application_score', parseFloat(e.target.value))}
                      className="input input-bordered input-sm w-full max-w-xs"
                    />
                  ) : (
                    <span className="font-semibold">{formData.application_score}/10</span>
                  )}
                </div>

                <div>
                  <label className="font-medium block mb-1">Note test écrit (/20) :</label>
                  {isEditing ? (
                    <input
                      type="number"
                      min="0"
                      max="20"
                      step="0.1"
                      value={formData.writen_test_average}
                      onChange={(e) => handleInputChange('writen_test_average', parseFloat(e.target.value))}
                      className="input input-bordered input-sm w-full max-w-xs"
                    />
                  ) : (
                    <span className="font-semibold">{formData.writen_test_average}/20</span>
                  )}
                </div>

                <div>
                  <label className="font-medium block mb-1">Entretien autorisé :</label>
                  {isEditing ? (
                    <input
                      type="checkbox"
                      checked={formData.interview_test_authorized}
                      onChange={(e) => handleInputChange('interview_test_authorized', e.target.checked)}
                      className="checkbox checkbox-sm"
                    />
                  ) : (
                    <span className={`badge ${formData.interview_test_authorized ? 'badge-success' : 'badge-error'} badge-sm`}>
                      {formData.interview_test_authorized ? 'Oui' : 'Non'}
                    </span>
                  )}
                </div>

                <div>
                  <label className="font-medium block mb-1">Motif :</label>
                  {isEditing ? (
                    <textarea
                      value={formData.status_reason}
                      onChange={(e) => handleInputChange('status_reason', e.target.value)}
                      className="textarea textarea-bordered textarea-sm w-full"
                      rows={2}
                      placeholder="Motif du statut (optionnel)"
                    />
                  ) : (
                    <span className="italic">{formData.status_reason || 'Aucun motif spécifié'}</span>
                  )}
                </div>
                
                <div>
                  <span className="font-medium">Déposée le : </span>
                  <span>{formatDate(application.created_at)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Informations sur la campagne */}
          {application.campaign && (
            <div>
              <h4 className="font-semibold mb-2">Campagne</h4>
              <div className="bg-base-200 p-3 rounded text-sm">
                <p className="font-medium">{application.campaign.title}</p>
                {application.campaign.description && (
                  <p className="text-base-content/70">{application.campaign.description}</p>
                )}
              </div>
            </div>
          )}

          {/* Profil de candidature */}
          {application.campaign_profile && (
            <div>
              <h4 className="font-semibold mb-2">Profil visé</h4>
              <div className="bg-base-200 p-3 rounded text-sm">
                <p className="font-medium">{application.campaign_profile.name}</p>
                {application.campaign_profile.description && (
                  <p className="text-base-content/70">{application.campaign_profile.description}</p>
                )}
              </div>
            </div>
          )}

          {/* Note Test écrit - Section supprimée car intégrée dans la section Candidature */}

          {/* Entretien autorisé - Section supprimée car intégrée dans la section Candidature */}

          {/* Réponses du formulaire */}
          {application.application_responses && application.application_responses.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">Réponses du formulaire</h4>
              <div className="space-y-4">
                {application.application_responses.map((resp) => {
                  const field = resp.campaign_field;
                  let value = resp.response_value;

                  // Traitement spécial pour les fichiers base64
                  if (isBase64File(value)) {
                    return (
                      <div key={resp.id} className="bg-base-200 p-4 rounded">
                        <p className="font-medium mb-3">{field?.label}</p>
                        <FileViewer 
                          base64String={value} 
                          fileName={field?.label}
                        />
                      </div>
                    );
                  }

                  // Traitement pour les champs checkbox/radio
                  if (field?.field_type === "checkbox" || field?.field_type === "radio") {
                    value = formatOptionValue(resp.response_value, field.options);
                  }

                  return (
                    <div key={resp.id} className="bg-base-200 p-4 rounded">
                      <p className="font-medium mb-2">{field?.label}</p>
                      {field?.description && (
                        <p className="text-xs text-base-content/60 mb-2">{field.description}</p>
                      )}
                      <div className="text-base-content/80">
                        {field?.field_type === "textarea" ? (
                          <div className="whitespace-pre-wrap break-words">{value}</div>
                        ) : (
                          <div className="break-words">{value}</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="modal-action sticky bottom-0 bg-base-100 pt-4">
          <button
            className="btn btn-primary"
            onClick={() => onClose(false)}
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateApplicationShow;