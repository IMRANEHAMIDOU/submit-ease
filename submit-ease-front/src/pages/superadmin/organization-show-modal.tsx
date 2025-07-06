
import type { OrganizationType } from "../../types/type";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  organization: OrganizationType | null;
};

const OrganizationShowModal = ({ isOpen, onClose, organization }: Props) => {
  if (!isOpen || !organization) return null;

  return (
    <dialog id="view_organization_modal" className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Détails de l'organisation</h3>
        <div className="space-y-2">
          <p><strong>Nom :</strong> {organization.name}</p>
          <p><strong>Email :</strong> {organization.email}</p>
          <p><strong>Domaine :</strong> {organization.domain}</p>
          <p><strong>Contact :</strong> {organization.contact_person || "-"}</p>
          <p><strong>Pays :</strong> {organization.country || "-"}</p>
          <p><strong>Ville :</strong> {organization.city || "-"}</p>
          <p><strong>Adresse :</strong> {organization.address || "-"}</p>
          <p><strong>Site web :</strong> {organization.website || "-"}</p>
          <p><strong>Vérifiée :</strong> {organization.verified ? "Oui" : "Non"}</p>
          <p><strong>Statut :</strong> {organization.is_active ? "Activée" : "Désactivée"}</p>
        </div>
        <div className="modal-action">
          <button type="button" className="btn" onClick={onClose}>
            Fermer
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default OrganizationShowModal;