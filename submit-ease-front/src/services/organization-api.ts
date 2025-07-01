import type { OrganizationType } from "../types/type"
import api from "./api"

export const apiOrganizations = async ()=>{
    try {
        const res = await api.get('admin/organizations')

        return res.data as OrganizationType[]
        
    } catch (error) {
        console.log(error)
    }
}