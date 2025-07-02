class CampaignsController < ApplicationController

  # Voir la liste des concours de l'organisation en question
    def index
        @campaigns = Campaign.where(organization_id: params[:organization_id])
        render json: @campaigns
    end

    def show
    @campaign = Campaign.includes(:campaign_fields, :campaign_profiles).find_by(id: params[:id])

    if @campaign
        render json: @campaign.as_json(include: { campaign_fields: {}, campaign_profiles: {} }), status: :ok
    else
        render json: { error: "Campagne introuvable." }, status: :not_found
    end
    end

    def create
    @campaign = Campaign.new(campaign_params)

    if @campaign.save
        campaign = Campaign.find(@campaign.id)

        if params[:campaign_fields].present?
        params[:campaign_fields].each do |field_attrs|
            campaign.campaign_fields.create!(
            label: field_attrs[:label],
            description: field_attrs[:description],
            field_type: field_attrs[:field_type],
            options: field_attrs[:options],
            order_number: field_attrs[:order_number],
            is_required: field_attrs[:is_required]
            )
        end
        end

        if params[:campaign_profiles].present?
        params[:campaign_profiles].each do |profile_attrs|
            campaign.campaign_profiles.create!(
            name: profile_attrs[:name],
            description: profile_attrs[:description],
            positions_available: profile_attrs[:positions_available]
            )
        end
        end

        render json: campaign.as_json(include: [:campaign_fields, :campaign_profiles]), status: :created
    else
        render json: { errors: @campaign.errors.full_messages }, status: :unprocessable_entity
    end
    end

    def update
        @campaign = Campaign.includes(:campaign_fields, :campaign_profiles).find(params[:id])

        if @campaign.update(campaign_params)
            # --- Synchroniser les fields ---
            if params[:campaign_fields]
                current_field_ids = @campaign.campaign_fields.pluck(:id)
                received_field_ids = params[:campaign_fields].map { |f| f[:id] }.compact

                # Supprimer ceux qui ne sont plus présents
                fields_to_delete = current_field_ids - received_field_ids
                @campaign.campaign_fields.where(id: fields_to_delete).destroy_all

                # Mettre à jour ou créer
                params[:campaign_fields].each do |field_attrs|
                    if field_attrs[:id]
                        # Update
                        field = CampaignField.find_by!(id: field_attrs[:id], campaign_id: @campaign.id)
                       if field.nil?
                             field.update!(
                                label: field_attrs[:label],
                                description: field_attrs[:description],
                                field_type: field_attrs[:field_type],
                                options: field_attrs[:options],
                                order_number: field_attrs[:order_number],
                                is_required: field_attrs[:is_required]
                            )
                       end
                    else
                        # Create
                        @campaign.campaign_fields.create!(
                            label: field_attrs[:label],
                            description: field_attrs[:description],
                            field_type: field_attrs[:field_type],
                            options: field_attrs[:options],
                            order_number: field_attrs[:order_number],
                            is_required: field_attrs[:is_required]
                        )
                    end
                end
            end

            # --- Synchroniser les profiles ---
            if params[:campaign_profiles]
                current_profile_ids = @campaign.campaign_profiles.pluck(:id)
                received_profile_ids = params[:campaign_profiles].map { |p| p[:id] }.compact

                # Supprimer ceux qui ne sont plus présents
                profiles_to_delete = current_profile_ids - received_profile_ids
                @campaign.campaign_profiles.where(id: profiles_to_delete).destroy_all

                # Mettre à jour ou créer
                params[:campaign_profiles].each do |profile_attrs|
                    if profile_attrs[:id]
                        # Update
                        profile = CampaignProfile.find_by!(id: profile_attrs[:id], campaign_id: @campaign.id)
                        if profile.nil?
                            profile.update!(
                                name: profile_attrs[:name],
                                description: profile_attrs[:description],
                                positions_available: profile_attrs[:positions_available]
                            )
                        end
                    else
                        # Create
                        @campaign.campaign_profiles.create!(
                            name: profile_attrs[:name],
                            description: profile_attrs[:description],
                            positions_available: profile_attrs[:positions_available]
                        )
                    end
                end
            end

            render json: @campaign.as_json(include: [:campaign_fields, :campaign_profiles]), status: :ok
        else
            render json: { errors: @campaign.errors.full_messages }, status: :unprocessable_entity
        end
    end


  # Supprimer un concours
    def destroy
        @campaign = Campaign.find(params[:id])
        @campaign.destroy
        head :no_content
    end

    # Les methodes invisibles par l'utilisateur
    private

    # Protéger les données reçues
    def campaign_params
        params.require(:campaign).permit(
            :title,
            :description,
            :has_writen_test,
            :has_interview,
            :opening_date,
            :closing_date,
            :is_application_limited,
            :max_application,
            :status,
            :publication_link,
            :organization_id
        )
    end

    def campaign_fields_params
        params.permit(campaign_fields: [:label, :description, :field_type, :options, :order_number, :is_required])
    end

    def campaign_profiles_params
        params.permit(campaign_profiles: [:name, :description, :positions_available])
    end

end
