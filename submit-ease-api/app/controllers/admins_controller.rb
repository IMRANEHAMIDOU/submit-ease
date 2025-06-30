class AdminsController < ApplicationController
    before_action :authenticate_admin!         # Vérifie si l'utilisateur est admin
    before_action :set_organization, only: [:show, :edit, :update, :destroy]

    def index
      @organizations = Organization.order(created_at: :desc)
    end

    def show
    end

    def new
      @organization = Organization.new
    end

    def create
      @organization = Organization.new(organization_params)
      if @organization.save
        redirect_to admin_organization_path(@organization), notice: 'Organisation créée avec succès.'
      else
        render :new, status: :unprocessable_entity
      end
    end

    def edit
    end

    def update
      if @organization.update(organization_params)
        redirect_to admin_organization_path(@organization), notice: 'Organisation mise à jour avec succès.'
      else
        render :edit, status: :unprocessable_entity
      end
    end

    def destroy
      @organization.destroy
      redirect_to admin_organizations_path, notice: 'Organisation supprimée avec succès.'
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
        :country,
        :city,
        :verified,
        :is_active,
        :address,
        :website
      )
    end

    def authenticate_admin!
      unless current_user&.admin?
        redirect_to root_path, alert: "Accès réservé aux administrateurs."
      end
    end
  end

    
end
