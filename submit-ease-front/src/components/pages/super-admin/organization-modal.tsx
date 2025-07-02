import Alert from "../../ui/alert";

type formOrganization = {
  id?: number;
  name: string;
  description: string;
  domain: string;
  email: string;
  contact_person: string;
  country: string;
  city: string;
  address: string;
  website: string;
  verified: boolean;
  is_active: boolean;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  organizationData: formOrganization;
  setOrganizationData: React.Dispatch<React.SetStateAction<formOrganization>>;
  loading: boolean;
  formErrors: string[];
};

export default function OrganizationModal({
  isOpen,
  onClose,
  onSubmit,
  organizationData,
  setOrganizationData,
  loading,
  formErrors,
}: Props) {
  return (
    <dialog className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box w-lg">
        <h3 className="font-bold text-lg mb-4">
          {organizationData.id ? "Modification d'organisation" : "Ajouter une organisation"}
        </h3>

        {formErrors.length > 0 && <Alert messages={formErrors} />}

        <form onSubmit={onSubmit} className="space-y-3">
            <div className="flex gap-2">
                <div className="form-control w-1/2">
                    <label className="label">
                    <span className="label-text">Nom</span>
                    </label>
                    <input
                    type="text"
                    placeholder="Nom de l'organisation"
                    className="input input-bordered w-full"
                    value={organizationData.name}
                    onChange={(e) => setOrganizationData({ ...organizationData, name: e.target.value })}
                    required
                    />
                </div>

                <div className="form-control w-1/2">
                    <label className="label">
                    <span className="label-text">Email</span>
                    </label>
                    <input
                    type="email"
                    placeholder="email@exemple.com"
                    className="input input-bordered w-full"
                    value={organizationData.email}
                    onChange={(e) => setOrganizationData({ ...organizationData, email: e.target.value })}
                    required
                    />
                </div>
            </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Domaine</span>
            </label>
            <input
              type="text"
              placeholder="example.com"
              className="input input-bordered w-full"
              value={organizationData.domain}
              onChange={(e) => setOrganizationData({ ...organizationData, domain: e.target.value })}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Contact</span>
            </label>
            <input
              type="text"
              placeholder="Nom du contact"
              className="input input-bordered w-full"
              value={organizationData.contact_person}
              onChange={(e) => setOrganizationData({ ...organizationData, contact_person: e.target.value })}
            />
          </div>


          <div className="flex gap-2">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Pays</span>
              </label>
              <input
                type="text"
                placeholder="Pays"
                className="input input-bordered w-full"
                value={organizationData.country}
                onChange={(e) => setOrganizationData({ ...organizationData, country: e.target.value })}
              />
            </div>

            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Ville</span>
              </label>
              <input
                type="text"
                placeholder="Ville"
                className="input input-bordered w-full"
                value={organizationData.city}
                onChange={(e) => setOrganizationData({ ...organizationData, city: e.target.value })}
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Adresse</span>
            </label>
            <input
              type="text"
              placeholder="Adresse"
              className="input input-bordered w-full"
              value={organizationData.address}
              onChange={(e) => setOrganizationData({ ...organizationData, address: e.target.value })}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Site web</span>
            </label>
            <input
              type="text"
              placeholder="https://..."
              className="input input-bordered w-full"
              value={organizationData.website}
              onChange={(e) => setOrganizationData({ ...organizationData, website: e.target.value })}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={organizationData.verified}
              onChange={(e) => setOrganizationData({ ...organizationData, verified: e.target.checked })}
              className="checkbox"
            />
            <span>Vérifié</span>
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