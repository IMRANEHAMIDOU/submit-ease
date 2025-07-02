class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  def create
    if params[:user][:role] == 'admin' && params[:organization].present?
      # Cas organisation
      ActiveRecord::Base.transaction do
        @organization = Organization.new(organization_params)
        @organization.verified = false
        @organization.is_active = true
        @organization.save!

        build_resource(sign_up_params)
        resource.role = 1
        resource.organization = @organization
        resource.save!

        sign_up(resource_name, resource) if resource.persisted?
      end
    else
      # Cas candidat
      build_resource(sign_up_params)
      resource.role = 0
      resource.save!

      sign_up(resource_name, resource) if resource.persisted?
    end

    if resource.persisted?
      render json: {
        success: true,
        message: 'Inscription réussie',
        user: {
          id: resource.id,
          email: resource.email,
          role: resource.role,
          organization_id: resource.organization_id
        },
        organization: @organization&.as_json(only: [:id, :name, :verified])
      }, status: :ok
    else
      render json: { success: false, errors: resource.errors.full_messages }, status: :unprocessable_entity
    end
  rescue ActiveRecord::RecordInvalid => e
    render json: { success: false, errors: [e.message] }, status: :unprocessable_entity
  end

  private

  def sign_up_params
    params.require(:user).permit(:email, :password, :password_confirmation, :role)
  end

  def organization_params
    params.require(:organization).permit(:name, :description, :domain, :contact_person, :address, :website, :logo, :email)
  end
end
