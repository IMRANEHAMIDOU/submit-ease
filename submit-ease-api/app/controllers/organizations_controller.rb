class OrganizationsController < ApplicationController
    before_action :authenticate_user!
    before_action :set_organization, only: [:show, :update, :destroy]
  
    def index
        organizations = Organization.order(created_at: :desc)
        render json: organizations.as_json, status: :ok
    end

    def show
        render json:  @organization.as_json, status: :ok
    end

    def create
        puts params
        @organization = Organization.new(organization_params)
        if @organization.save
            render json: @organization.as_json, message: 'Organisation créée avec succès.', status: :created
        else
            render json: { errors: @organization.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update
        if @organization.update(organization_params)
            render json: @organization.as_json, status: :ok
        else
            render json: { errors: @organization.errors.full_messages }, status: :unprocessable_entity
        end
    end

   def destroy
        if @organization.users.exists?
            render json: { errors: ["Impossible de supprimer : des utilisateurs sont associés à cette organisation."] }, status: :unprocessable_entity
        else
            @organization.destroy
            render json: { message: 'Organisation supprimée avec succès.' }, status: :no_content
        end
    end

    private

    def set_organization
        @organization = Organization.find(params[:id])
    end

  def organization_params
    params.require(:organization).permit(
      :name,
      :description,
      :logo,
      :domain,
      :contact_person,
      :email,
      :contry,
      :city,
      :verified,
      :is_active,
      :address,
      :website
    )
  end

end
