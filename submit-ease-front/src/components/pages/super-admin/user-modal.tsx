import type { OrganizationType } from "../../../types/type";
import Alert from "../../ui/alert";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  userData: {
    id?: number;   
    email: string;
    role: string;
    organization_id?: number | "";
  };
  setUserData: React.Dispatch<React.SetStateAction<{
    email: string;
    role: string;
    organization_id?: number | "";
}>>

  organizations: OrganizationType[];
  loading: boolean;
  formErrors: string[];
};

export default function UserModal({
  isOpen,
  onClose,
  onSubmit,
  userData,
  setUserData,
  organizations,
  loading,
  formErrors,
}: Props) {
  return (
    <dialog className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">
            {userData.id  ?  "Modification utilisateurs" : "Ajouter un utilisateur"}
        </h3>

        {formErrors.length > 0 && <Alert messages={formErrors} />}
        <form onSubmit={onSubmit}>
          <div className="form-control mb-3">
            <label className="label mb-2 block">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email@exemple.com"
              className="w-full input input-bordered"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              disabled={userData.id ? true : false}
            />
          </div>

          <div className="form-control mb-3">
            <label className="label mb-2 block">
              <span className="label-text">Rôle</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={userData.role}
              onChange={(e) => setUserData({ ...userData, role: e.target.value })}
            >
              <option value="admin">Admin</option>
              <option value="candidate">Candidat</option>
              <option value="superadmin">Super Admin</option>
            </select>
          </div>

          <div className="form-control mb-4">
            <label className="label mb-2 block">
              <span className="label-text">Organisation</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={userData.organization_id || ""}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  organization_id: e.target.value ? Number(e.target.value) : "",
                })
              }
            >
              <option value="">Aucune</option>
              {organizations.map((org) => (
                <option key={org.id} value={org.id}>
                  {org.name}
                </option>
              ))}
            </select>
          </div>

          <div className="modal-action">
            <button type="button" className="btn" onClick={onClose}>
              Annuler
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
