class Users::SessionsController < Devise::SessionsController
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    unless resource.is_active?
      sign_out(resource)
      return render json: { success: false, message: "Votre compte n'est pas activé." }, status: :unauthorized
    end

    if resource.organization.present?
      unless resource.organization.is_active? && resource.organization.verified?
        sign_out(resource)
        return render json: { success: false, message: "L'organisation n'est pas activée ou vérifiée." }, status: :unauthorized
      end
    end

    # Connexion acceptée : renvoyer un JSON contrôlé
    render json: {
      success: true,
      user: {
        id: resource.id,
        email: resource.email,
        role: resource.role,
        organization_id: resource.organization_id,
        avatar: resource.avatar
      },
      message: "Connexion réussie."
    }, status: :ok
  end

  def respond_to_on_destroy
    head :no_content
  end
end