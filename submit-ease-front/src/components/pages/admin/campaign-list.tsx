import { useEffect, useState } from "react"
import { Plus, Trash2, Eye, Edit3, Calendar, Users, FileText, MessageCircle, Filter } from "lucide-react"
import useAuthUser from "react-auth-kit/hooks/useAuthUser"
import type { CampaignType, UserType } from "../../../types/type"
import { apiCampaigns, deleteCampaign } from "../../../services/capaign-api"
import Loading from "../../ui/loading"
import { DeleteConfirmModal } from "../../ui/delete-confirm-modal"
import Toast from "../../ui/toast"

const CampaignList = () => {
  const authUser: UserType = useAuthUser()!
  const [campaigns, setCampaigns] = useState<CampaignType[]>([])
  const [loadingFetch, setLoadingFetch] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [campaignToDelete, setCampaignToDelete] = useState<CampaignType | null>(null)
  const [loadingDelete, setLoadingDelete] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [toastMessageType, setToastMessageType] = useState<"success" | "error">("success")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "closed">("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Fetch campaigns
  const fetchCampaigns = async () => {
    setLoadingFetch(true)
    try {
      const data = await apiCampaigns(authUser.organization_id)
      if (data) setCampaigns(data)
    } catch (error) {
      console.error(error)
      setToastMessageType("error")
      setToastMessage("Erreur lors du chargement des campagnes.")
    } finally {
      setLoadingFetch(false)
    }
  }

  useEffect(() => {
    fetchCampaigns()
  }, [])

  // Delete modal handling
  const confirmDelete = (campaign: CampaignType) => {
    setCampaignToDelete(campaign)
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!campaignToDelete) return

    setLoadingDelete(true)
    try {
      await deleteCampaign(campaignToDelete.id!, authUser.organization_id)
      await fetchCampaigns()
      setToastMessageType("success")
      setToastMessage("Concours supprimée avec succès !")
    } catch (error) {
      console.error(error)
      setToastMessageType("error")
      setToastMessage("Erreur inattendue lors de la suppression.")
    } finally {
      setLoadingDelete(false)
      setIsDeleteModalOpen(false)
      setCampaignToDelete(null)
    }
  }

  // Filtering & search
  const filteredCampaigns = campaigns.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description!.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || c.status === filterStatus
    return matchesSearch && matchesFilter
  })

  // Card component
  const CampaignCard = ({ campaign }: { campaign: CampaignType }) => {
    const progressPercent = campaign.max_application
      ? 50
      : 0

    return (
      <div className="group bg-base-100 rounded-2xl shadow-sm border border-base-300 hover:shadow-xl hover:border-primary/30 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
        <div className="bg-gradient-to-r from-primary via-secondary to-accent p-6 text-primary-content relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 flex justify-between items-start mb-3">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2 leading-tight">{campaign.title}</h3>
              <p className="text-primary-content/80 text-sm opacity-90 line-clamp-2">{campaign.description}</p>
            </div>
            <div className="ml-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium border ${
                  campaign.status === "closed"
                    ? "bg-base-300 text-base-content/60 border-base-300"
                    : "bg-success/10 text-success border-success/30"
                }`}
              >
                {campaign.status === "active" ? "Actif" : "Fermé"}
              </span>
            </div>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-base-200/50 rounded-xl p-4 hover:bg-primary/10 transition-colors flex items-center gap-3">
              <Users className="w-5 h-5 text-primary" />
              <div>
                <p className="text-2xl font-bold text-base-content">{105}</p>
                <p className="text-xs text-base-content/60">Candidatures</p>
              </div>
            </div>
            <div className="bg-base-200/50 rounded-xl p-4 hover:bg-secondary/10 transition-colors flex items-center gap-3">
              <Calendar className="w-5 h-5 text-secondary" />
              <div>
                <p className="text-2xl font-bold text-base-content">
                  {Math.max(
                    0,
                    Math.ceil((new Date(campaign.closing_date!).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                  )}
                </p>
                <p className="text-xs text-base-content/60">Jours restants</p>
              </div>
            </div>
          </div>

          {campaign.is_application_limited && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-base-content">Progression</span>
                <span className="text-xs text-base-content/60">
                 10/20
                </span>
              </div>
              <div className="w-full bg-base-300 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-6">
            {campaign.has_writen_test && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-success/10 text-success rounded-full text-xs font-medium border border-success/30">
                <FileText className="w-3 h-3" />
                Test écrit
              </span>
            )}
            {campaign.has_interview && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-warning/10 text-warning rounded-full text-xs font-medium border border-warning/30">
                <MessageCircle className="w-3 h-3" />
                Entretien
              </span>
            )}
            {campaign.is_application_limited && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-error/10 text-error rounded-full text-xs font-medium border border-error/30">
                <Users className="w-3 h-3" />
                Limité
              </span>
            )}
          </div>

          <div className="bg-base-200/30 rounded-xl p-4 mb-6 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-base-content/60 mb-1">Ouverture</p>
              <p className="font-medium text-base-content">{new Date(campaign.opening_date!).toLocaleDateString("fr-FR")}</p>
            </div>
            <div>
              <p className="text-base-content/60 mb-1">Fermeture</p>
              <p className="font-medium text-base-content">{new Date(campaign.closing_date!).toLocaleDateString("fr-FR")}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="flex-1 btn btn-primary rounded-xl font-medium transition-all duration-200 hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2">
              <Eye className="w-4 h-4" />
              Voir
            </button>
            <button className="flex-1 btn btn-outline rounded-xl font-medium transition-all duration-200 hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2">
              <Edit3 className="w-4 h-4" />
              Modifier
            </button>
            <button
              onClick={() => confirmDelete(campaign)}
              className="btn btn-outline btn-error rounded-xl font-medium transition-all duration-200 hover:shadow-lg transform hover:scale-105 flex items-center justify-center"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base-200/30 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-extrabold text-base-content">Gestion des Concours</h1>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <input
              type="search"
              placeholder="Rechercher un concours..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 input input-bordered rounded-xl"
            />
            <button
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              className="btn btn-outline rounded-xl"
              aria-label="Changer la vue"
            >
              <Filter className="w-5 h-5" />
            </button>
            <button className="btn btn-primary rounded-xl flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Ajouter
            </button>
          </div>
        </div>

        {/* Contenu */}
        {loadingFetch ? (
          <Loading />
        ) : filteredCampaigns.length === 0 ? (
          <p className="text-center text-base-content/60 mt-24 text-lg">Aucun concours trouvé.</p>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                : "flex flex-col divide-y divide-base-300"
            }
          >
            {filteredCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        )}
      </div>

      {/* Modal suppression */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setCampaignToDelete(null)
        }}
        onConfirm={handleConfirmDelete}
        itemName={campaignToDelete?.title}
        loading={loadingDelete}
      />

      {/* Toast */}
      {toastMessage && (
        <Toast
          type={toastMessageType}
          message={toastMessage}
          onClose={() => setToastMessage("")}
        />
      )}
    </div>
  )
}

export default CampaignList