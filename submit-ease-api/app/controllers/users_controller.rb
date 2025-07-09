class UsersController < ApplicationController
  
  before_action :set_user, only: [:update, :show]

  def index
    users = User.includes(:organization).select(:id, :email, :role, :is_active, :organization_id)
    render json: users.as_json(include: { organization: { only: [:id, :name] } })
  end

  def show
    render json: @user.as_json(
      include: { organization: { only: [:id, :name] } },
      except: [:password_digest, :created_at, :updated_at]
    )
  end

  def create
    user = User.new(user_params)

    user.password = "000000"
    user.password_confirmation = "000000"

    if user.save
      render json: user.as_json(include: {organization: {only: [:id, :name]}}), status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end

  end

  def update
    if @user.update(user_params)
      render json: @user.as_json(include: { organization: { only: [:id, :name] } }), status: :ok
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end


def my_campaigns
  applications = CandidateApplication.includes(:campaign, :campaign_profile).where(user_id: current_user.id).order(id: :desc)

  campaigns = applications.map do |application|
    campaign_data = {
      id: application.campaign.id,
      title: application.campaign.title,
      description: application.campaign.description,
      status: application.campaign.status,
      opening_date: application.campaign.opening_date,
      closing_date: application.campaign.closing_date,
      profile_name: application.campaign_profile.name,
      registration_number: application.registration_number,
      application_status: application.application_status,
      created_at: application.created_at
    }

    if application.campaign.status == "closed"
      campaign_data.merge!(
        application_score: application.application_score,
        writen_test_average: application.writen_test_average,
        interview_test_authorized: application.interview_test_authorized,
        status_reason: application.status_reason,
      )
    end

    campaign_data
  end

  render json: campaigns, status: :ok
end



  private
  def user_params
    params.require(:user).permit(
      :email, :role, :organization_id, :is_active,
      :first_name, :last_name, :gender, :birth_date, :phone, :avatar
    )
  end

  def set_user
    @user = User.includes(:organization).find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Utilisateur non trouvé" }, status: :not_found
  end

end
