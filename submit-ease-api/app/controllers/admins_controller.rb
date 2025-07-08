class AdminsController < ApplicationController
  before_action :authenticate_user!

  def admin_dashboard
    users_count = User.where(organization_id: current_user.organization_id).count
    opened_campaigns_count = Campaign.where(status: 'open', organization_id: current_user.organization_id).count
    campaigns_count = Campaign.where(organization_id: current_user.organization_id).count

    render json: {
        users_count: users_count,
        opened_campaigns_count: opened_campaigns_count,
        campaigns_count: campaigns_count
    }
  end

  def superadmin_dashboard
    organizations_count = Organization.count
    users_count = User.count
    opened_campaigns_count = Campaign.where(status: 'open').count
    campaigns_count = Campaign.count
    pending_organisation = Organization.where(verified: false).count

    render json: {
        users_count: users_count,
        opened_campaigns_count: opened_campaigns_count,
        campaigns_count: campaigns_count,
        pending_organisation: pending_organisation,
        organizations_count: organizations_count
    }
  end
end
