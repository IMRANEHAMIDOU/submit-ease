import type { AdminStatsType } from "../types/type";
import api from "./api";

export const fetchAdminStats = async (): Promise<AdminStatsType> => {
  const response = await api.get<AdminStatsType>('/admin/admin_dashboard');
  return response.data;
};

export const fetchSuperAdminStats = async (): Promise<AdminStatsType> => {
  const response = await api.get<AdminStatsType>('/admin/superadmin_dashboard');
  return response.data;
};