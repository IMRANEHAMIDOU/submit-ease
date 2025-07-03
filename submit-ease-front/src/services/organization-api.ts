import api from "./api";
import type { formOrganization, OrganizationType } from "../types/type";

// Récupérer toutes les organisations
export const apiOrganizations = async (): Promise<OrganizationType[]> => {
  try {
    const res = await api.get('/admin/organizations');
    return res.data;
  } catch (error) {
    console.error("Erreur API récupération organizations :", error);
    throw error;
  }
};

// Créer une nouvelle organisation
export const createOrganization = async (data: { organization: formOrganization }): Promise<OrganizationType> => {
  try {
    const res = await api.post('/admin/organizations', data);
    return res.data;
  } catch (error) {
    console.error("Erreur API création organization :", error);
    throw error;
  }
};

// Mettre à jour une organisation
export const updateOrganization = async (
  id: number,
  data: { organization: formOrganization }
): Promise<OrganizationType> => {
  try {
    const res = await api.patch(`/admin/organizations/${id}`, data);
    return res.data;
  } catch (error) {
    console.error("Erreur API mise à jour organization :", error);
    throw error;
  }
};

// Activer / désactiver une organisation
export const activeOrDisableOrganization = async (id: number, value: boolean): Promise<OrganizationType> => {
  try {
    const res = await api.patch(`/admin/organizations/${id}`, {
      organization: {
        is_active: value,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Erreur API activation/desactivation organization :", error);
    throw error;
  }
};

// Supprimer une organisation
export const deleteOrganization = async (id: number): Promise<void> => {
  try {
    await api.delete(`/admin/organizations/${id}`);
  } catch (error) {
    console.error("Erreur API suppression organization :", error);
    throw error;
  }
};

