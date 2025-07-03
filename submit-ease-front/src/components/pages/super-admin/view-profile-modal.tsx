
import type { UserType } from "../../../types/type";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  user: UserType | null;
};

export default function ViewProfileModal({ isOpen, onClose, user }: Props) {
  if (!isOpen || !user) return null;

  return (
    <dialog className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box max-w-md">
        <h3 className="font-bold text-lg mb-4">Détails du profil utilisateur</h3>
        <div className="space-y-2 text-sm">
          <p>
            <strong>Prénom :</strong> {user.first_name || "-"}
          </p>
          <p>
            <strong>Nom :</strong> {user.last_name || "-"}
          </p>
          <p>
            <strong>Genre :</strong>{" "}
            {user.gender === 0
              ? "Féminin"
              : user.gender === 1
              ? "Masculin"
              : user.gender === 2
              ? "Autre"
              : "-"}
          </p>
          <p>
            <strong>Date de naissance :</strong>{" "}
            {user.birth_date ? new Date(user.birth_date).toLocaleDateString() : "-"}
          </p>
          <p>
            <strong>Téléphone :</strong> {user.phone || "-"}
          </p>
          <p>
            <strong>Avatar :</strong>{" "}
            {user.avatar ? (
              <a href={user.avatar} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                Voir l'avatar
              </a>
            ) : (
              "-"
            )}
          </p>
          <p>
            <strong>Email :</strong> {user.email}
          </p>
          <p>
            <strong>Rôle :</strong> {user.role}
          </p>
          <p>
            <strong>Organisation :</strong> {user.organization ? user.organization.name : "-"}
          </p>
          <p>
            <strong>Statut :</strong> {user.is_active ? "Activé" : "Désactivé"}
          </p>
        </div>
        <div className="modal-action">
          <button type="button" className="btn" onClick={onClose}>
            Fermer
          </button>
        </div>
      </div>
    </dialog>
  );
}
