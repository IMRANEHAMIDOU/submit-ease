import axios, { AxiosError } from "axios";

// Fonctions utilitaires
export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};


type CampaignStatus = 'open' | 'processing' | 'closed' | 'draft';

export const getStatusText = (status: string | undefined) => {
  const statusTexts: Record<CampaignStatus, string> = {
    open: "Ouvert",
    processing: "En cours de traitement",
    closed: "Fermé",
    draft: "Brouillon",
  }

  if (!status || !(status in statusTexts)) {
    return "Inconnu"
  }
  return statusTexts[status as CampaignStatus]
}

export const getStatusStyle = (status: string) => {
  const statusStyles = {
    open: "bg-success/10 text-success border-success/30",
    processing: "bg-warning/10 text-warning border-warning/30",
    closed: "bg-base-300 text-base-content/60 border-base-300",
    draft: "bg-gray-100 text-gray-500 border-gray-200",
  } as const

  return statusStyles[status as keyof typeof statusStyles] ?? "bg-gray-100 text-gray-500 border-gray-200"
}

export const getDaysRemaining = (closingDate: string) => {
  const today = new Date();
  const endDate = new Date(closingDate);
  const diffTime = endDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const getAxiosErrorMessage = (err: unknown): string => {
  if (axios.isAxiosError(err)) {
    const axiosErr = err as AxiosError<any>

    if (axiosErr.response) {
      const data = axiosErr.response.data

      if (typeof data?.error === "string") {
        return data.error
      }

      if (typeof data?.message === "string") {
        return data.message
      }

      if (data?.errors && typeof data.errors === "object") {
        const messages = Object.values(data.errors)
          .flat()
          .filter(Boolean)
        return messages.join(" / ")
      }

      if (typeof data === "string") {
        return data
      }

      return JSON.stringify(data)
    }

    if (axiosErr.request) {
      return "Aucune réponse du serveur. Vérifie ta connexion."
    }

    return axiosErr.message
  }

  return "Une erreur inattendue s'est produite."
}

export const statusToNumber = (status:string)=>{
    switch(status){
      case 'draft':
        return '0'
        break
      case 'open':
        return '1'
        break
      case 'closed':
        return '2'
        break
      default: 
        return '3'
    }
}


