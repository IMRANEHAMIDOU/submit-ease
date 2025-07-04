class CandidateApplicationsController < ApplicationController
  # Si besoin d'authentification API
  # before_action :authenticate_user!

  def create
    # Créer la candidature
    application = CandidateApplication.new(application_params)

    if application.save
      # Gérer aussi les réponses associées si tu reçois des champs supplémentaires
      if params[:responses]
        params[:responses].each do |field_id, value|
          ApplicationResponse.create!(
            candidate_application: application,
            campaign_field_id: field_id,
            response_value: value
          )
        end
      end

      render json: { message: "Candidature créée avec succès", application: application }, status: :created
    else
      render json: { errors: application.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def application_params
    params.require(:candidate_application).permit(
      :registration_number,
      :user_id,
      :campaign_id,
      :campaign_profile_id,
      :organization_id,
      :application_status,
      :status_reason,
      :application_score,
      :writen_test_average,
      :interview_test_authorized
    )
  end
end

