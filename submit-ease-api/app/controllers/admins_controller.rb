class AdminsController < ApplicationController
  before_action :authenticate_user!
  before_action :authorize_admin!

  # Informations nécessaires pour le tableau de bord admin
  def index
    
    # Nombre d'organisations gérées : souvent 1 (celle de l'admin), sinon adapte selon ta logique
    organizations_count = current_user.organization.present? ? 1 : 0

    # Utilisateurs de l'organisation de l'admin
    users_count = User.where(organization_id: current_user.organization_id).count

    # Concours actifs de l'organisation de l'admin
    active_contests_count = Contest.where(status: 'active', organization_id: current_user.organization_id).count

    # Utilisateurs en attente d'activation dans l'organisation
    pending_approvals_count = User.where(organization_id: current_user.organization_id, is_active: false).count

    render json: {
      managedOrganizations: organizations_count,
      managedUsers: users_count,
      activeContests: active_contests_count,
      pendingApprovals: pending_approvals_count
    }
  end

  private

  def authorize_admin!
    unless current_user.admin? || current_user.superadmin?
      render json: { error: 'Non autorisé' }, status: :forbidden
    end
  end
end
