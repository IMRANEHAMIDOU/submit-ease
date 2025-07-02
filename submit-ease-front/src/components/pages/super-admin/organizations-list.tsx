import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import {
  apiOrganizations,
  createOrganization,
  updateOrganization,
  activeOrDisableOrganization,
  deleteOrganization,
} from "../../../services/organization-api";
import type { OrganizationType, formOrganization } from "../../../types/type";
import type { AxiosError } from "axios";
import OrganizationModal from "./organization-modal";
import ViewOrganizationModal from "./view-organization-modal";
import Toast from "../../ui/toast";

const OrganizationsList = () => {
  const [organizations, setOrganizations] = useState<OrganizationType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState("");
  const [selectedOrganization, setSelectedOrganization] = useState<OrganizationType | null>(null);

  const [organizationData, setOrganizationData] = useState<formOrganization>({
    name: "",
    description: "",
    domain: "",
    email: "",
    contact_person: "",
    country: "",
    city: "",
    address: "",
    website: "",
    verified: false,
    is_active: true,
  });

  const fetchOrganizations = async () => {
    const data = await apiOrganizations();
    if (data) setOrganizations(data);
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const openModal = () => {
    setFormErrors([]);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setOrganizationData({
      name: "",
      description: "",
      domain: "",
      email: "",
      contact_person: "",
      country: "",
      city: "",
      address: "",
      website: "",
      verified: false,
      is_active: true,
    });
  };

  const handleViewOrganization = (org: OrganizationType) => {
    setSelectedOrganization(org);
    setIsViewModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (organizationData.id) {
        await updateOrganization(organizationData.id, { organization: organizationData });
      } else {
        await createOrganization({ organization: organizationData });
      }
      await fetchOrganizations();
      closeModal();
      setToastMessage("Organisation enregistrée avec succès !");
    } catch (error: unknown) {
      const err = error as AxiosError<{ errors: string[] }>;
      if (err.response?.data?.errors) {
        setFormErrors(err.response.data.errors);
      } else {
        setFormErrors(["Une erreur inattendue s'est produite."]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (org: OrganizationType) => {
    setOrganizationData({
      id: org.id,
      name: org.name || "",
      description: org.description || "",
      domain: org.domain || "",
      email: org.email || "",
      contact_person: org.contact_person || "",
      country: org.country || "",
      city: org.city || "",
      address: org.address || "",
      website: org.website || "",
      verified: org.verified ?? false,
      is_active: org.is_active ?? true,
    });
    setFormErrors([]);
    setIsModalOpen(true);
  };

  const handleChangeIsActive = async (id: number, value: boolean) => {
    try {
      await activeOrDisableOrganization(id, value);
      await fetchOrganizations();
      setToastMessage(`Organisation ${value ? "activée" : "désactivée"} avec succès !`);
    } catch (error) {
      console.error("Erreur changement statut organisation :", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Voulez-vous vraiment supprimer cette organisation ? Cette action est irréversible.")) {
      return;
    }
    try {
      await deleteOrganization(id);
      await fetchOrganizations();
      setToastMessage("Organisation supprimée avec succès !");
    } catch (error) {
      console.error("Erreur suppression organisation :", error);
      setToastMessage("Erreur lors de la suppression.");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Organisations</h1>
        <button onClick={openModal} className="btn btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Ajouter
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Domaine</th>
              <th>Activé</th>
              <th>Vérifié</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {organizations.length > 0 ? (
              organizations.map((org, i) => (
                <tr key={org.id}>
                  <td>{i + 1}</td>
                  <td>{org.name}</td>
                  <td>{org.email}</td>
                  <td>{org.domain}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={org.is_active ?? false}
                      className="checkbox"
                      onChange={(e) => handleChangeIsActive(org.id, e.target.checked)}
                    />
                  </td>
                  <td>
                    {org.verified ? (
                      <span className="badge badge-success">Oui</span>
                    ) : (
                      <span className="badge badge-ghost">Non</span>
                    )}
                  </td>
                  <td className="flex gap-2 flex-wrap">
                    <button
                      className="btn btn-xs text-info btn-outline"
                      onClick={() => handleViewOrganization(org)}
                    >
                      Voir
                    </button>
                    <button
                      className="btn btn-xs text-accent btn-outline"
                      onClick={() => handleEdit(org)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-xs btn-error btn-outline"
                      onClick={() => handleDelete(org.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center">
                  Aucune organisation pour le moment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <OrganizationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        organizationData={organizationData}
        setOrganizationData={setOrganizationData}
        loading={loading}
        formErrors={formErrors}
      />

      <ViewOrganizationModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        organization={selectedOrganization}
      />

      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage("")} />}
    </div>
  );
};

export default OrganizationsList;
