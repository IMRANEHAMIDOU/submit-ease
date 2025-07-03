import { useEffect, useState } from "react";
import { apiProfile, updateUser } from "../../../services/user-api";
import type { UserType } from "../../../types/type";
import Loading from "../../ui/loading";
import Toast from "../../ui/toast";

type Props = {
  userId: number;
};

const ProfileUser = ({ userId }: Props) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const data = await apiProfile(userId);
      setUser(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!user) return;
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    setErrors([]);
    try {
      await updateUser(user.id, user);
      setToastMessage("Profil mis à jour avec succès !");
    } catch (error: any) {
      const err = error as { response?: { data?: { errors?: string[] } } };
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        setErrors(["Une erreur est survenue."]);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading && !user) return <Loading />;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Mon Profil</h1>
      {errors.length > 0 && (
        <div className="bg-red-100 text-red-800 p-2 rounded mb-2">
          {errors.map((err, i) => (
            <div key={i}>{err}</div>
          ))}
        </div>
      )}
      {user && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Prénom</label>
            <input
              name="first_name"
              value={user.first_name || ""}
              onChange={handleChange}
              className="input input-bordered w-full"
              type="text"
            />
          </div>
          <div>
            <label className="label">Nom</label>
            <input
              name="last_name"
              value={user.last_name || ""}
              onChange={handleChange}
              className="input input-bordered w-full"
              type="text"
            />
          </div>
          <div>
            <label className="label">Genre</label>
            <select
              name="gender"
              value={user.gender ?? ""}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="">-- Choisir --</option>
              <option value="0">Féminin</option>
              <option value="1">Masculin</option>
            </select>
          </div>
          <div>
            <label className="label">Date de naissance</label>
            <input
              name="birth_date"
              value={user.birth_date || ""}
              onChange={handleChange}
              className="input input-bordered w-full"
              type="date"
            />
          </div>
          <div>
            <label className="label">Téléphone</label>
            <input
              name="phone"
              value={user.phone || ""}
              onChange={handleChange}
              className="input input-bordered w-full"
              type="tel"
            />
          </div>
          <div>
  <label className="label">Avatar</label>
  <input
    name="avatar"
    onChange={(e) => {
      if (!user) return;
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setUser({ ...user, avatar: reader.result as string });
        };
        reader.readAsDataURL(file);
      }
    }}
    className="file-input file-input-bordered w-full"
    type="file"
    accept="image/*"
  />
  {user.avatar && (
    <img
      src={user.avatar}
      alt="Aperçu de l'avatar"
      className="mt-2 w-32 h-32 object-cover rounded border"
    />
  )}
</div>

          <div>
  <label className="label">Email</label>
  <input
    name="email"
    value={user.email || ""}
    className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
    type="email"
    disabled
    readOnly
  />
</div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Enregistrement..." : "Enregistrer"}
          </button>
        </form>
      )}
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage("")} />
      )}
    </div>
  );
};

export default ProfileUser;
