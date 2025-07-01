import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { apiUsers, createUser, updateUser } from "../../../services/user-api";
import { apiOrganizations } from "../../../services/organization-api";
import type { UserType, OrganizationType } from "../../../types/type";
import type { AxiosError } from "axios";
import UserModal from "./user-modal";
import Toast from "../../ui/toast";

const UsersList = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [organizations, setOrganizations] = useState<OrganizationType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [loading, setLoading] = useState(false)
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const [toastMessage, setToastMessage] = useState("");

  const [userData, setUserData] = useState<{
    id?:number
    email: string
    role: string
    organization_id?: number | ""
  }>({
    email: "",
    role: "admin",
    organization_id: "",
  });

   const fetchUsers = async () => {
      const data = await apiUsers();
      if (data) setUsers(data);
    };

  useEffect(() => {
    const fetchOrganizations = async () => {
      const data = await apiOrganizations();
      if (data) setOrganizations(data);
    };

    fetchUsers();
    fetchOrganizations();
  }, []);

  const openModal = () => {
    setFormErrors([])
    setIsModalOpen(true)
}

  const closeModal = () => {
    setIsModalOpen(false);
    setUserData({ email: "", role: "admin", organization_id: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    
    const payload = {
      email: userData.email,
      role: userData.role,
      organization_id: userData.organization_id || null,
    };

    try {

         if (userData.id) {
            await updateUser(userData.id,payload)
        } else {
            await createUser(payload);
        }

        await fetchUsers();
        closeModal();
        setToastMessage("Utilisateur enregistré avec succès !");

    } catch (error : unknown) {
        const err = error as AxiosError<{ errors: string[] }>;
        if (err.response && err.response.data && err.response.data.errors) {
            setFormErrors(err.response.data.errors);
        } else {
            setFormErrors(["Une erreur inattendue s'est produite."]);
        }
    }finally{
        setLoading(false)
    }
  };

  const handleEdit = (user: UserType) => {
    setUserData({
        id: user.id,
        email: user.email,
        role: user.role,
        organization_id: user.organization?.id || "",
    });
    setFormErrors([]);
    setIsModalOpen(true);
};

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Utilisateurs</h1>
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
              <th>Email</th>
              <th>Rôle</th>
              <th>Organisation</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, i) => (
                <tr key={user.id}>
                  <td>{i + 1}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.organization ? user.organization.name : "-"}</td>
                  <td>
                    <button className="btn btn-sm btn-outline">Voir</button>
                    <button className="btn btn-sm text-accent btn-outline ml-2" onClick={()=>handleEdit(user)}>Edit</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center">
                  Aucun utilisateur pour le moment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

  
      <UserModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onSubmit={handleSubmit}
            userData={userData}
            setUserData={setUserData}
            organizations={organizations}
            loading={loading}
            formErrors={formErrors}
        />

        {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage("")} />}
    </div>
  );
};

export default UsersList;
