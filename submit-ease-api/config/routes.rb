Rails.application.routes.draw do
  devise_for :users,
    path: '/',
    path_names: {
      sign_in: 'login',
      sign_out: 'logout',
      registration: 'signup'
    },
    controllers: {
      sessions: 'users/sessions',
      registrations: 'users/registrations'
    }

  #/admin pour afficher les info du tableau de bord
  #/admin/organizations : liste des
  #/admin/organizations/1/applications
  scope "/admin" do
    resources :users
    resources :organizations do
      resources :compaingns do
        resources :compaingn_profiles
      end
    end
  end

  resources :candidate_applications
  resources :compaign_fields
end
