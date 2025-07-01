import api from "./api"

export const apiUsers = async ()=>{
    try {
        const res = await api.get('/admin/users')
        //console.log(res.data)
        return res.data
    } catch (error) {
        console.log("Erreur API ", error)
    }
}


export interface formUser {
  email: string
  role: string
  organization_id?: number | null
}

// Créer un nouvel utilisateur
export const createUser = async (data: formUser) => {
  try {
    const res = await api.post('/admin/users', data);
    //console.log("Utilisateur créé :", res.data);
    return res.data;
  } catch (error) {
    console.error("Erreur API création user :", error);
    throw error; 
  }
};

export const updateUser = async (id:number, data : formUser)=>{
    try {
        const res = await api.patch(`/admin/users/${id}`, data)
        return res.data
    } catch (error) {
        console.error("Erreur API création user :", error);
        throw error; 
    }
}