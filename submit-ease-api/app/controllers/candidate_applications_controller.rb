class CandidateApplicationsController < ApplicationController
    ## before_action :authenticate_user!
    def current_user
        User.first # ou User.find(1)
    end

    # Voir toutes les candidatures du candidat connecté
    def index
        @applications = CandidateApplication.where(user_id: current_user.id)
        render json: @applications, include: :application_responses
    end

    # Soumission d'une candidature
    def create
        ActiveRecord::Base.transaction do
        @application = CandidateApplication.new(application_params)
        @application.user_id = current_user.id
        @application.registration_number = generate_registration_number
        @application.application_status = 0

        if @application.save
            params[:responses].each do |resp|
                ApplicationResponse.create!(
                    candidate_application_id: @application.id,
                    campaign_field_id: resp[:campaign_field_id],
                    response_value: resp[:value]  # <-- ici la bonne clé
                )
            end
            render json: { message: "Candidature enregistrée avec succès", candidature: @application }, status: :created
        else
            render json: @application.errors, status: :unprocessable_entity
        end
    end
    rescue => e
        render json: { error: "Erreur lors de la soumission : #{e.message}" }, status: :unprocessable_entity
    end

    private

    # Données autorisées pour créer une candidature
    def application_params
        params.require(:candidate_application).permit(
            :campaign_id,
            :campaign_profile_id,
            :organization_id
        )
    end

    # Génération d’un numéro d’enregistrement unique
    def generate_registration_number
        "REG-#{SecureRandom.hex(4).upcase}"
    end
end
