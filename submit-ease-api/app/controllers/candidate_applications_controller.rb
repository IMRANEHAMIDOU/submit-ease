class CandidateApplicationsController < ApplicationController

  before_action :authenticate_user!

  def create
    existing_application = CandidateApplication.find_by(user_id: application_params[:user_id], campaign_id: application_params[:campaign_id])

    if existing_application
      render json: { error: "Vous avez déjà postulé à cette concours." }, status: :unprocessable_entity
      return
    end


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

  def show
    @application = CandidateApplication
      .includes(
        :user,
        :campaign_profile,
        application_responses: [:campaign_field]
      )
      .find_by(id: params[:id])

    if @application
      render json: @application.as_json(
        include: {
          user: {},
          campaign_profile: {},
          application_responses: {
            include: :campaign_field
          }
        }
      ), status: :ok
    else
      render json: { error: "Candidature introuvable." }, status: :not_found
    end
  end

  def update
    application = CandidateApplication.find(params[:id])
    if application.update(application_params)
      render json: { message: "Modification effectuer avec succès", application: application }, status: :ok
    else
      render json: { errors: application.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private
  def application_params
    params.require(:candidate_application).permit(
      :id,
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

