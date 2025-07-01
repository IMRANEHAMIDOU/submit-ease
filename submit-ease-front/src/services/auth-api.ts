import api from './api';

// Types pour les données d'inscription
export interface CandidatSignupData {
  userType: 'candidat';
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface OrganisationSignupData {
  userType: 'organisation';
  email: string;
  password: string;
  passwordConfirmation: string;
  // Données organisation
  nom: string;
  description: string;
  domaine: string;
  contact: string;
  adresse: string;
  siteWeb?: string;
  logo?: File;
}

export type SignupData = CandidatSignupData | OrganisationSignupData;

export interface SignupResponse {
  success: boolean;
  message: string;
  user?: {
    id: number;
    email: string;
    role: string;
    organization_id?: number;
  };
  organization?: {
    id: number;
    name: string;
    verified: boolean;
  };
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: number;
    email: string;
    role: string;
    first_name?: string;
    last_name?: string;
    organization_id?: number;
  };
}



// Fonction d'inscription
export const apiSignup = async (data: SignupData) => {
  try {
    const formData = new FormData();
    
    if (data.userType === 'candidat') {
      formData.append('user[email]', data.email);
      formData.append('user[password]', data.password);
      formData.append('user[password_confirmation]', data.passwordConfirmation);
      formData.append('user[role]', 'candidat');
      
      const response = await api.post('/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response;

    } else {
      formData.append('user[email]', data.email);
      formData.append('user[password]', data.password);
      formData.append('user[password_confirmation]', data.passwordConfirmation);
      formData.append('user[role]', 'admin');
      
      // Données organisation
      formData.append('organization[name]', data.nom);
      formData.append('organization[description]', data.description);
      formData.append('organization[domain]', data.domaine);
      formData.append('organization[contact_person]', data.contact);
      formData.append('organization[address]', data.adresse);
      formData.append('organization[email]', data.email);
      
      if (data.siteWeb) {
        formData.append('organization[website]', data.siteWeb);
      }
      
      if (data.logo) {
        formData.append('organization[logo]', data.logo);
      }
      
      const response = await api.post('/signup/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response;
    }
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
  }
};

// Fonction de connexion
export const apiLogin = async (data: LoginData) => {
  try {
    const response = await api.post<LoginResponse>('/login', {
      user: {
        email: data.email,
        password: data.password
      }
    });

    return response;
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'response' in error) {
      console.log(error);
    }
    throw error;
  }
};
