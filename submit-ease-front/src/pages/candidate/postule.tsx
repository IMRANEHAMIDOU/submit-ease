import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { CampaignType, CampaignProfileType, CampaignFieldType, UserType } from "../../types/type";
import { showCampaignPublic } from "../../services/campaign-api";
import { createCandidateApplication } from "../../services/candidate-application-api";
import Loading from "../../components/loading";
import { Send, AlertCircle } from "lucide-react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import Toast from "../../components/toast";
import { getAxiosErrorMessage } from "../../utils/utils";



const Postule = () => {
  const { link } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState<CampaignType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const authUser: UserType | null = useAuthUser();

  const [selectedProfileId, setSelectedProfileId] = useState<number | null>(null);
  const [responses, setResponses] = useState<Record<number, string|File>>({});
  const [submitting, setSubmitting] = useState(false);
  
  const [tooastData, setToastData] = useState<{message:string, type?:string}>({message: ''})

  // Charger la campagne
  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await showCampaignPublic("", link);
        if (data) {
          setCampaign(data);
        } else {
          setError("Campagne introuvable");
        }
      } catch (error) {
        console.error("Erreur lors du chargement de la campagne:", error);
        setError("Erreur lors du chargement de la campagne. Veuillez réessayer.");
      } finally {
        setLoading(false);
      }
    };

    if (link) {
      fetchCampaign();
    }
  }, [link]);

  // Gérer les changements des champs
  const handleChange = (fieldId: number, value: string | File) => {
    if (value instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setResponses((prev) => ({
          ...prev,
          [fieldId]: reader.result as string, // c'est la chaîne base64
        }));

        console.log(reader.result?.toString())
      };
      reader.readAsDataURL(value);
    } else {
      setResponses((prev) => ({
        ...prev,
        [fieldId]: value,
      }));
    }


  };


  // Valider le formulaire
  const validateForm = (): string | null => {
    if (!authUser) {
      return "Vous devez être connecté pour postuler.";
    }

    if (!campaign || !selectedProfileId) {
      return "Veuillez sélectionner un profil pour votre candidature.";
    }

    // Vérifier les champs requis
    const requiredFields = campaign.campaign_fields?.filter(field => field.is_required) || [];
    for (const field of requiredFields) {
      if (!responses[field.id!] || responses[field.id!] === "") {
        return `Le champ "${field.label}" est requis.`;
      }
    }

    return null;
  };

  // Soumettre la candidature
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setToastData({
        type: 'warning',
        message: validationError
      });
      return;
    }

    try {
      setSubmitting(true);
      const applicationData = {
        user_id: authUser!.id,
        campaign_id: campaign!.id,
        campaign_profile_id: selectedProfileId!,
        organization_id: campaign!.organization_id,
      };

      await createCandidateApplication(applicationData, responses);

      setToastData({
        type: 'success',
        message: 'Votre candidature a été soumise avec succès !'
      });

      setTimeout(() => {
        navigate('/candidate/dashboard');
      }, 2000);
      
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
      setToastData({
        type: 'error',
        message: getAxiosErrorMessage(error)
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-base-200/50 p-6">
        <div className="container mx-auto max-w-3xl bg-base-100 p-6 rounded shadow">
          <div className="alert alert-error">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="btn btn-primary mt-4"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen bg-base-200/50 p-6">
        <div className="container mx-auto max-w-3xl bg-base-100 p-6 rounded shadow">
          <div className="alert alert-warning">
            <AlertCircle className="w-5 h-5" />
            <span>Campagne introuvable</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200/50 p-6">
      <div className="container mx-auto max-w-3xl bg-base-100 p-6 rounded shadow">

       

        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-4 text-base-content">
            Postuler à : {campaign.title}
          </h1>
          <p className="text-base-content/70">{campaign.description}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Sélection du profil */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Choisissez un profil *</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={selectedProfileId ?? ""}
              onChange={(e) => setSelectedProfileId(Number(e.target.value))}
              required
            >
              <option value="">-- Sélectionner un profil --</option>
              {campaign.campaign_profiles?.map((profile: CampaignProfileType) => (
                <option key={profile.id} value={profile.id}>
                  {profile.name}
                </option>
              ))}
            </select>
          </div>

          {/* Champs personnalisés */}
          {campaign.campaign_fields?.map((field: CampaignFieldType) => {
            const options = field.options ? field.options.split('\n').map(opt => opt.trim()).filter(Boolean) : [];

            return (
              <div key={field.id} className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    {field.label}
                    {field.is_required && <span className="text-error ml-1">*</span>}
                  </span>
                </label>

                {field.field_type === "textarea" && (
                  <textarea
                    placeholder={`Votre réponse pour ${field.label}`}
                    className="textarea textarea-bordered w-full"
                    value={responses[field.id!].toString() || ""}
                    onChange={(e) => handleChange(field.id!, e.target.value)}
                    required={field.is_required}
                    rows={4}
                  />
                )}

                {field.field_type === "file" && (
                  <input
                    type="file"
                    className="file-input file-input-bordered w-full"
                    onChange={(e) =>{
                       if (e.target.files && e.target.files[0]) {
                        handleChange(field.id!, e.target.files[0]);
                      }
                    }}
                    required={field.is_required}
                  />
                )}

                {field.field_type === "radio" && options.length > 0 && (
                  <div className="space-y-2">
                    {options.map((option, idx) => (
                      <label key={idx} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name={`field_${field.id}`}
                          value={option}
                          checked={responses[field.id!] === option}
                          onChange={(e) => handleChange(field.id!, e.target.value)}
                          required={field.is_required}
                          className="radio radio-primary"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                )}

                {field.field_type === "checkbox" && options.length > 0 && (
                  <div className="space-y-2">
                    {options.map((option, idx) => {
                      const currentValues = responses[field.id!]?.toString().split(',') || [];
                      const isChecked = currentValues.includes(option);

                      const handleCheckboxChange = (value: string) => {
                        let updatedValues = [...currentValues];
                        if (updatedValues.includes(value)) {
                          updatedValues = updatedValues.filter((v) => v !== value);
                        } else {
                          updatedValues.push(value);
                        }
                        handleChange(field.id!, updatedValues.join(','));
                      };

                      return (
                        <label key={idx} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            value={option}
                            checked={isChecked}
                            onChange={() => handleCheckboxChange(option)}
                            className="checkbox checkbox-primary"
                          />
                          <span>{option}</span>
                        </label>
                      );
                    })}
                  </div>
                )}

                {field.field_type === "text" && options.length === 0 && (
                  <input
                    type="text"
                    placeholder={`Votre réponse pour ${field.label}`}
                    className="input input-bordered w-full"
                    value={responses[field.id!]?.toString() || ""}
                    onChange={(e) => handleChange(field.id!, e.target.value)}
                    required={field.is_required}
                  />
                )}
              </div>
            );
          })}

          {/* Bouton soumettre */}
          <div className="form-control">
            <button 
              type="submit" 
              className="btn btn-primary btn-lg w-full" 
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Envoi en cours...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Soumettre ma candidature
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <Toast message={tooastData.message} type={tooastData.type} onClose={()=>setToastData({message: ''})}/>
    </div>
  );
};

export default Postule;