import type { UserType } from "../../../types/type";

type Props = {
  isOpen: boolean
  onClose: () => void
  user: UserType | null
};

const ViewUserModal = ({ isOpen, onClose, user }: Props) => {
  if (!isOpen || !user) return null;

  return (
    <dialog id="view_user_modal" className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Détails de l'utilisateur</h3>
        <div className="space-y-2">
          <p><strong>Email :</strong> {user.email}</p>
          <p><strong>Rôle :</strong> {user.role}</p>
          <p><strong>Organisation :</strong> {user.organization ? user.organization.name : "-"}</p>
          <p><strong>Statut :</strong> {user.is_active ? "Activé" : "Désactivé"}</p>
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

export default ViewUserModal;
