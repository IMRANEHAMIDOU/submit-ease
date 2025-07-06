import api from "./api"
import type { CandidateApplicationType } from "../types/type"

export const createCandidateApplication = async (
  applicationData: Partial<CandidateApplicationType>,
  responses: Record<number, string|File>
) => {
  try {
    const res = await api.post('/candidate_applications', {
      candidate_application: applicationData,
      responses: responses
    })

    return res.data
  } catch (error) {
    console.error("Erreur lors de la création de la candidature :", error)
    throw error
  }
}

export const apiGetCandidateApplication = async (id: number) => {
  const res = await api.get(`/candidate_applications/${id}`);
  return res.data;
};
