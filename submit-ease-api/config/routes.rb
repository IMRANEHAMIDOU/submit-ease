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
      resources :campaigns
    end

    get '/admin_dashboard', to:'admins#admin_dashboard'
    get '/superadmin_dashboard', to:'admins#superadmin_dashboard'
  end

  #public concours
  get '/campaigns', to:"campaigns#public_campaigns"
  get '/campaigns/show', to:"campaigns#show_campaign_public"

  

  resources :candidate_applications
  resources :compaign_fields
end
