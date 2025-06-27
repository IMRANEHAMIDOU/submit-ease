class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  private

   def respond_with(resource, _opts = {})
      if resource.persisted?
        render json: { user: resource, message: 'Inscription réussie' }, status: :ok
      else
        render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
      end
    end

  def respond_to_on_destroy
    head :no_content
  end
end
