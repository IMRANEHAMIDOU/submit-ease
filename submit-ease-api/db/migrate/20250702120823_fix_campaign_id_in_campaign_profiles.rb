class FixCampaignIdInCampaignProfiles < ActiveRecord::Migration[8.0]
  def up
    # Supprimer la contrainte étrangère mal nommée
    remove_foreign_key :campaign_profiles, column: :compaign_id

    # Renommer la colonne
    rename_column :campaign_profiles, :compaign_id, :campaign_id

    # Ajouter la bonne contrainte étrangère
    add_foreign_key :campaign_profiles, :campaigns
  end

  def down
    remove_foreign_key :campaign_profiles, column: :campaign_id
    rename_column :campaign_profiles, :campaign_id, :compaign_id
    add_foreign_key :campaign_profiles, :compaigns
  end
end