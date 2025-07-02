class UsersController < ApplicationController
  
  before_action :set_user, only: [:update]

  def index
    users = User.includes(:organization).select(:id, :email, :role, :is_active, :organization_id)
    render json: users.as_json(include: { organization: { only: [:id, :name] } })
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


  private
  def user_params
    params.require(:user).permit(:email, :role, :organization_id, :is_active)
  end

  def set_user
    @user = User.find(params[:id])
  end
end
