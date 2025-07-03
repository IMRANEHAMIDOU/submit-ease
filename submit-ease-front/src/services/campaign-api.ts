import type { CampaignType } from "../types/type";
import api from "./api";

// Récupérer toutes les organisations
export const apiCampaigns = async (organization_id:number): Promise<CampaignType[]> => {
  try {
    const res = await api.get(`/admin/organizations/${organization_id}/campaigns`);
    return res.data;
  } catch (error) {
    console.error("Erreur API récupération organizations :", error);
    throw error;
  }
};



export const createCampaign = async (data : { campaign: CampaignType, organization_id:number }): Promise<CampaignType> => {
  try {
    const res = await api.post(`/admin/organizations/${data.organization_id}/campaigns`, 
      {
        campaign: data.campaign,
        campaign_fields: data.campaign.campaign_fields,
        campaign_profiles: data.campaign.campaign_profiles
      }
    );
    return res.data;
  } catch (error) {
    console.error("Erreur API création organization :", error);
    throw error;
  }
};


export const updateCampaign = async (
  data : { campaign: CampaignType, organization_id:number }
): Promise<CampaignType> => {
  try {
     const res = await api.patch(`/admin/organizations/${data.organization_id}/campaigns/${data.campaign.id}`,
      {
        campaign: data.campaign,
        campaign_fields: data.campaign.campaign_fields,
        campaign_profiles: data.campaign.campaign_profiles
      }
     )
    return res.data;
  } catch (error) {
    console.error("Erreur API mise à jour organization :", error);
    throw error;
  }
};

// Supprimer une organisation
export const deleteCampaign = async (id: number, organization_id:number): Promise<void> => {
  try {
    await api.delete(`/admin/organizations/${organization_id}/campaigns/${id}`);
  } catch (error) {
    console.error("Erreur API suppression organization :", error);
    throw error;
  }
};
