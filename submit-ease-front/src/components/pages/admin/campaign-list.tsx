import { useEffect, useState } from "react"
import { Filter, Plus } from "lucide-react"
import useAuthUser from "react-auth-kit/hooks/useAuthUser"
import type { CampaignType, UserType, OrganizationType } from "../../../types/type"
import { apiCampaigns, deleteCampaign, createCampaign, updateCampaign } from "../../../services/campaign-api"
import { apiOrganizations } from "../../../services/organization-api"
import Loading from "../../ui/loading"
import { DeleteConfirmModal } from "../../ui/delete-confirm-modal"
import Toast from "../../ui/toast"
import CampaignAdminCard from "./campaign-admin-card"
import CampaignModal from "./campaign-modal"

const CampaignList = () => {
  const authUser: UserType = useAuthUser()!
  const [campaigns, setCampaigns] = useState<CampaignType[]>([])
  const [organizations, setOrganizations] = useState<OrganizationType[]>([])
  const [loadingFetch, setLoadingFetch] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [campaignToDelete, setCampaignToDelete] = useState<CampaignType | null>(null)
  const [loadingDelete, setLoadingDelete] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [toastMessageType, setToastMessageType] = useState<"success" | "error">("success")
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const [formErrors, setFormErrors] = useState<string[]>([])

  // Initial campaign data
  const initialCampaignData: CampaignType = {
    title: "",
    description: "",
    has_writen_test: false,
    has_interview: false,
    opening_date: "",
    closing_date: "",
    is_application_limited: false,
    max_application: 0,
    publication_link: "",
    organization_id: authUser.organization_id || 0,
    status: "active",
    campaign_fields: [],
    campaign_profiles: []
  }

  const [campaignData, setCampaignData] = useState<CampaignType>(initialCampaignData)

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

  // Fetch organizations
  const fetchOrganizations = async () => {
    try {
      const data = await apiOrganizations()
      if (data) setOrganizations(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchCampaigns()
    fetchOrganizations()
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

  // Modal handling
  const handleOpenModal = (campaign?: CampaignType) => {
    if (campaign) {
      setCampaignData(campaign)
    } else {
      setCampaignData(initialCampaignData)
    }
    setFormErrors([])
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setCampaignData(initialCampaignData)
    setFormErrors([])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoadingSubmit(true)
    setFormErrors([])

    try {
      // Validation
      const errors: string[] = []
      if (!campaignData.title.trim()) errors.push("Le titre est requis")
      if (!campaignData.organization_id) errors.push("L'organisation est requise")
      
      if (errors.length > 0) {
        setFormErrors(errors)
        setLoadingSubmit(false)
        return
      }

      if (campaignData.id) {
        // Update
        await updateCampaign({campaign:campaignData, organization_id:campaignData.organization_id})
        setToastMessageType("success")
        setToastMessage("Campagne modifiée avec succès !")
      } else {
        // Create
        await createCampaign({campaign:campaignData, organization_id:campaignData.organization_id})
        setToastMessageType("success")
        setToastMessage("Campagne créée avec succès !")
      }

      await fetchCampaigns()
      handleCloseModal()
    } catch (error) {
      console.error(error)
      setToastMessageType("error")
      setToastMessage("Erreur lors de l'enregistrement de la campagne.")
    } finally {
      setLoadingSubmit(false)
    }
  }

  // Filtering
  const filteredCampaigns = campaigns.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.description && c.description.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesSearch
  })

  return (
    <div className="min-h-screen bg-base-200/30 p-6">
      <div className="max-w-7xl mx-auto">
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
            <button 
              className="btn btn-primary rounded-xl flex items-center gap-2"
              onClick={() => handleOpenModal()}
            >
              <Plus className="w-5 h-5" />
              Ajouter
            </button>
          </div>
        </div>

        {loadingFetch ? (
          <Loading />
        ) : filteredCampaigns.length === 0 ? (
          <p className="text-center text-base-content/60 mt-24 text-lg">Aucun concours trouvé.</p>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6"
                : "flex flex-col divide-y divide-base-300"
            }
          >
            {filteredCampaigns.map((campaign) => (
              <CampaignAdminCard 
                key={campaign.id} 
                campaign={campaign} 
                confirmDelete={confirmDelete}
                onEdit={() => handleOpenModal(campaign)}
              />
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

      {/* Modal campagne */}
      <CampaignModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        campaignData={campaignData}
        setCampaignData={setCampaignData}
        organizations={organizations}
        loading={loadingSubmit}
        formErrors={formErrors}
      />

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