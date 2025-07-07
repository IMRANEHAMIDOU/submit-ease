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

  # GET /candidate/mycampaigns
  # Affiche les candidatures du candidat connecté
  def my_campaigns
    user = current_user || User.first # Pour test sans devise

    applications = user.candidate_applications
                      .includes(:campaign)
                      .order(created_at: :desc)

    render json: applications.as_json(
      only: [:id, :registration_number, :application_status, :created_at],
      include: {
        campaign: {
          only: [:id, :nom, :description, :date_ouverture, :date_cloture]
        }
      }
    )
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
