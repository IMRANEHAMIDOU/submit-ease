class CompaingnsController < ApplicationController
    # Voir tous les concours
    def index
        @compaingns = compaingn.all
        render json: @compaigns
    end

    # Voir un concours en particulier
    def show
        @compaingns = compaingn.find(params[:id])
        render json: @compaingn
    end

    # Créer un nouveau concours
    def create
        @compaingn = compaingn.new(compaingn.params)

        if @compaingn.save
            render json: @compaingn, status: :created
        else
            render json: @compaingn.errors, status: :unprocessable_entity
        end
    end

    # Modifier un concours
    def update
        @compaingn = compaingn.find(params[:id])

        if @compaingn.update(compaingn.params)
            render json: @compaingn
        else
            render json: @compaingn.errors, status: :unprocessable_entity
        end
    end

    # Supprimer un concours
    def destroy
        @compaingn = compaingn.find(params[:id])
        @compaingn.destroy
        head :no_content
    end
end
