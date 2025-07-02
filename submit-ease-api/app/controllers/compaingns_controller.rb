class CompaingnsController < ApplicationController

  # Voir la liste des concours
  def index
    @compaingns = Compaingn.all
    render json: @compaingns
  end

  # Voir un concours en particulier
  def show
    @compaingn = Compaingn.find(params[:id])
    render json: @compaingn
  end

  # Créer un nouveau concours
  def create
    @compaingn = Compaingn.new(compaingn_params)

    if @compaingn.save
      render json: @compaingn, status: :created
    else
      render json: @compaingn.errors, status: :unprocessable_entity
    end
  end

  # Modifier un concours
  def update
    @compaingn = Compaingn.find(params[:id])

    if @compaingn.update(compaingn_params)
      render json: @compaingn
    else
      render json: @compaingn.errors, status: :unprocessable_entity
    end
  end

  # Supprimer un concours
  def destroy
    @compaingn = Compaingn.find(params[:id])
    @compaingn.destroy
    head :no_content
  end

  # Méthodes privées
  private

  def compaingn_params
    params.require(:compaingn).permit(
      :nom, :description, :test_ecris, :entretien,
      :date_ouverture, :date_cloture,
      :nbre_dossier_limité, :nombre_dossier,
      :status, :lien_publication, :organisation_id
    )
  end
end
