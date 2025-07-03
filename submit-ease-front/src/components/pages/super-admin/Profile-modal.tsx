
import type { OrganizationType } from "../../../types/type";
import Alert from "../../ui/alert";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  userData: {
    id?: number;
    first_name?: string;
    last_name?: string;
    gender?: number | "";
    birth_date?: string;
    phone?: string;
    avatar?: string;
    email: string;
    role: string;
    organization_id?: number | "";
  };
  setUserData: React.Dispatch<
    React.SetStateAction<{
      first_name?: string;
      last_name?: string;
      gender?: number | "";
      birth_date?: string;
      phone?: string;
      avatar?: string;
      email: string;
      role: string;
      organization_id?: number | "";
    }>
  >;
  organizations: OrganizationType[];
  loading: boolean;
  formErrors: string[];
};

export default function ProfileModal({
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
        <h3 className="font-bold text-lg mb-4">Modifier mon profil</h3>

        {formErrors.length > 0 && <Alert messages={formErrors} />}

        <form onSubmit={onSubmit}>
          {/* Prénom */}
          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Prénom</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={userData.first_name || ""}
              onChange={(e) =>
                setUserData({ ...userData, first_name: e.target.value })
              }
            />
          </div>

          {/* Nom */}
          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Nom</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={userData.last_name || ""}
              onChange={(e) =>
                setUserData({ ...userData, last_name: e.target.value })
              }
            />
          </div>

          {/* Genre */}
          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Genre</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={userData.gender ?? ""}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  gender: e.target.value !== "" ? Number(e.target.value) : "",
                })
              }
            >
              <option value="">-- Choisir --</option>
              <option value="0">Féminin</option>
              <option value="1">Masculin</option>
              <option value="2">Autre</option>
            </select>
          </div>

          {/* Date de naissance */}
          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Date de naissance</span>
            </label>
            <input
              type="date"
              className="input input-bordered w-full"
              value={userData.birth_date || ""}
              onChange={(e) =>
                setUserData({ ...userData, birth_date: e.target.value })
              }
            />
          </div>

          {/* Téléphone */}
          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Téléphone</span>
            </label>
            <input
              type="tel"
              className="input input-bordered w-full"
              value={userData.phone || ""}
              onChange={(e) =>
                setUserData({ ...userData, phone: e.target.value })
              }
            />
          </div>

          {/* Avatar */}
          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Avatar (URL)</span>
            </label>
            <input
              type="url"
              className="input input-bordered w-full"
              value={userData.avatar || ""}
              onChange={(e) =>
                setUserData({ ...userData, avatar: e.target.value })
              }
            />
          </div>

          {/* Email */}
          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              className="input input-bordered w-full"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              disabled={true} // souvent non modifiable sur profil
            />
          </div>

          {/* Rôle */}
          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Rôle</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={userData.role}
              onChange={(e) =>
                setUserData({ ...userData, role: e.target.value })
              }
            >
              <option value="admin">Admin</option>
              <option value="candidate">Candidat</option>
              <option value="superadmin">Super Admin</option>
            </select>
          </div>

          {/* Organisation */}
          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Organisation</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={userData.organization_id || ""}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  organization_id: e.target.value
                    ? Number(e.target.value)
                    : "",
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
              {loading ? "Enregistrement..." : "Enregistrer"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
