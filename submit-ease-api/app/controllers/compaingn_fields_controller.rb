class CompaingnFieldsController < ApplicationController
    # Afficher tous les champs existants
    def index
        @fields = compaingnField.all
        render json: @fields
    end

    # Afficher un champ précis à partir de son ID
    def show
        @field = compaingnField.find(params[:id])
        render json: @field
    end

    # Créer un nouveau champ
    def create
        @field = compaingnField.new(compaingn_field_params)
        if @field.save
            render json: @field, status: :created
        else
            render json: @field.errors, status: :unprocessable_entity
        end
    end

    # Mettre à jour un champ existant
    def update
        @field = compaingnField.find(params[:id])
        if @field.update(compaingn_field_params)
            render json: @field
        else
            render json: @field.errors, status: :unprocessable_entity
        end
    end

    # Supprimer un champ existant
    def destroy
        @field = compaingnField.find(params[:id])
        @field.destroy
        head :no_content
    end

    
end
