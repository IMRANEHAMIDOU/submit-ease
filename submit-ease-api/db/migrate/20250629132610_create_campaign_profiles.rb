class CreateCampaignProfiles < ActiveRecord::Migration[8.0]
  def change
    create_table :campaign_profiles do |t|
      t.string :name
      t.string :description
      t.integer :positions_available
      t.references :compaign, null: false, foreign_key: true
      t.timestamps
    end
  end
end
