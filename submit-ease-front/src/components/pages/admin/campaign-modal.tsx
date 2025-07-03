import React from 'react';
import type { CampaignType, OrganizationType, CampaignFieldType, CampaignProfileType } from "../../../types/type";
import Alert from "../../ui/alert";
import CampaignProfileCard from '../../ui/campaign-profile-card';
import CampaignFieldCard from '../../ui/campaign-field-card';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  campaignData: CampaignType;
  setCampaignData: React.Dispatch<React.SetStateAction<CampaignType>>;
  organizations: OrganizationType[];
  loading: boolean;
  formErrors: string[];
};

export default function CampaignModal({
  isOpen,
  onClose,
  onSubmit,
  campaignData,
  setCampaignData,
  loading,
  formErrors,
}: Props) {
  const handleInputChange = (field: keyof CampaignType, value: any) => {
    setCampaignData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  console.log(campaignData)
  const handleCheckboxChange = (field: keyof CampaignType, checked: boolean) => {
    setCampaignData(prev => ({
      ...prev,
      [field]: checked
    }));
  };

  // Gestion des champs de campagne
  const addCampaignField = () => {
    const newField: CampaignFieldType = {
      label: '',
      description: '',
      field_type: 'text',
      options: null,
      order_number: (campaignData.campaign_fields?.length || 0) + 1,
      is_required: false
    };
    
    setCampaignData(prev => ({
      ...prev,
      campaign_fields: [...(prev.campaign_fields || []), newField]
    }));
  };

  const updateCampaignField = (index: number, field: CampaignFieldType) => {
    setCampaignData(prev => ({
      ...prev,
      campaign_fields: (prev.campaign_fields || []).map((f, i) => i === index ? field : f)
    }));
  };

  const deleteCampaignField = (index: number) => {
    setCampaignData(prev => ({
      ...prev,
      campaign_fields: (prev.campaign_fields || []).filter((_, i) => i !== index)
    }));
  };

  // Gestion des profils de campagne
  const addCampaignProfile = () => {
    const newProfile: CampaignProfileType = {
      name: '',
      description: '',
      positions_available: 1
    };
    
    setCampaignData(prev => ({
      ...prev,
      campaign_profiles: [...(prev.campaign_profiles || []), newProfile]
    }));
  };

  const updateCampaignProfile = (index: number, profile: CampaignProfileType) => {
    setCampaignData(prev => ({
      ...prev,
      campaign_profiles: (prev.campaign_profiles || []).map((p, i) => i === index ? profile : p)
    }));
  };

  const deleteCampaignProfile = (index: number) => {
    setCampaignData(prev => ({
      ...prev,
      campaign_profiles: (prev.campaign_profiles || []).filter((_, i) => i !== index)
    }));
  };

  // Filtrage des données avant soumission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filtrer les champs et profils sans nom
    const filteredFields = (campaignData.campaign_fields || []).filter(field => field.label.trim() !== '');
    const filteredProfiles = (campaignData.campaign_profiles || []).filter(profile => profile.name.trim() !== '');
    
    // Mettre à jour les données avec les éléments filtrés
    setCampaignData(prev => ({
      ...prev,
      campaign_fields: filteredFields,
      campaign_profiles: filteredProfiles
    }));
    
    // Appeler la fonction de soumission originale
    onSubmit(e);
  };

  const formatDateTimeLocal = (value?: string) => {
    if (!value) return "";
    const date = new Date(value);
    // On enlève les secondes et millisecondes
    const localISO = date.toISOString().slice(0, 16);
    return localISO;
};

  return (
    <dialog className={`modal pt-8 ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box max-w-6xl max-h-[90vh] overflow-y-auto">
        <h3 className="font-bold text-lg mb-4">
          {campaignData.id ? "Modifier la campagne" : "Ajouter une campagne"}
        </h3>

        {formErrors.length > 0 && <Alert messages={formErrors} />}
        
        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Titre */}
            <div className="form-control md:col-span-2">
              <label className="label">
                <span className="label-text">Titre *</span>
              </label>
              <input
                type="text"
                placeholder="Titre de la campagne"
                className="input input-bordered w-full"
                value={campaignData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
              />
            </div>

            {/* Description */}
            <div className="form-control md:col-span-2">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                placeholder="Description de la campagne"
                className="textarea textarea-bordered w-full h-24"
                value={campaignData.description || ''}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </div>

            {/* Date d'ouverture */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Date d'ouverture</span>
              </label>
              <input
                type="datetime-local"
                className="input input-bordered w-full"
                value={formatDateTimeLocal(campaignData.opening_date) || ''}
                onChange={(e) => handleInputChange('opening_date', e.target.value)}
              />
            </div>

            {/* Date de fermeture */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Date de fermeture</span>
              </label>
              <input
                type="datetime-local"
                className="input input-bordered w-full"
                value={formatDateTimeLocal(campaignData.closing_date) || ''}
                onChange={(e) => handleInputChange('closing_date', e.target.value)}
              />
            </div>

            {/* Statut */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Statut</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={campaignData.status || 'active'}
                onChange={(e) => handleInputChange('status', e.target.value)}
              >
                <option value="">Brouillon</option>
                <option value="1">Ouvert</option>
                <option value="2">Fermé</option>
                <option value="3">Encours</option>
              </select>
            </div>

            {/* Lien de publication */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Lien de publication</span>
              </label>
              <input
                type="url"
                placeholder="https://exemple.com/publication"
                className="input input-bordered w-full"
                disabled
                value={campaignData.publication_link || ''}
                onChange={(e) => handleInputChange('publication_link', e.target.value)}
              />
            </div>
          </div>

          {/* Options de candidature */}
          <div className="divider">Options de candidature</div>
          
          <div className="flex flex-col gap-2">
            <div className="form-control">
              <label className="label cursor-pointer">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  checked={campaignData.is_application_limited}
                  onChange={(e) => handleCheckboxChange('is_application_limited', e.target.checked)}
                />
                <span className="label-text">Limiter les candidatures</span>
                {campaignData.is_application_limited && (
                  <div className="form-control ml-4">
                    <input
                      type="number"
                      min="1"
                      className="input input-bordered input-sm w-24"
                      value={campaignData.max_application}
                      onChange={(e) => handleInputChange('max_application', Number(e.target.value))}
                    />
                  </div>
                )}
              </label>
            </div>

            {/* Test écrit */}
            <div className="form-control">
              <label className="label cursor-pointer">
                <input
                  type="checkbox"
                  className="checkbox checkbox-success"
                  checked={campaignData.has_writen_test}
                  onChange={(e) => handleCheckboxChange('has_writen_test', e.target.checked)}
                />
                <span className="label-text">Test écrit requis</span>
              </label>
            </div>

            {/* Entretien */}
            <div className="form-control">
              <label className="label cursor-pointer">
                <input
                  type="checkbox"
                  className="checkbox checkbox-warning"
                  checked={campaignData.has_interview}
                  onChange={(e) => handleCheckboxChange('has_interview', e.target.checked)}
                />
                <span className="label-text">Entretien requis</span>
              </label>
            </div>
          </div>

          {/* Profils recherchés */}
          <div className="divider">Profils recherchés</div>
          <div className="mb-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-600">
                {campaignData.campaign_profiles?.length || 0} profil(s) ajouté(s)
              </span>
              <button
                type="button"
                className="btn btn-sm btn-outline btn-primary"
                onClick={addCampaignProfile}
              >
                + Ajouter un profil
              </button>
            </div>
            
            {campaignData.campaign_profiles?.map((profile, index) => (
              <CampaignProfileCard
                key={index}
                profile={profile}
                index={index}
                onUpdate={updateCampaignProfile}
                onDelete={deleteCampaignProfile}
              />
            ))}
          </div>

          {/* Champs personnalisés */}
          <div className="divider">Champs personnalisés</div>
          <div className="mb-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-600">
                {campaignData.campaign_fields?.length || 0} champ(s) ajouté(s)
              </span>
              <button
                type="button"
                className="btn btn-sm btn-outline btn-secondary"
                onClick={addCampaignField}
              >
                + Ajouter un champ
              </button>
            </div>
            
            {campaignData.campaign_fields?.map((field, index) => (
              <CampaignFieldCard
                key={index}
                field={field}
                index={index}
                onUpdate={updateCampaignField}
                onDelete={deleteCampaignField}
              />
            ))}
          </div>

          {/* Actions */}
          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>
              Annuler
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Enregistrement...
                </>
              ) : (
                'Enregistrer'
              )}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}