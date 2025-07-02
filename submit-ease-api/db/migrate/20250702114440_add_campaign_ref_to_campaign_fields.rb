class AddCampaignRefToCampaignFields < ActiveRecord::Migration[8.0]
  def change
    add_reference :campaign_fields, :campaign,  null: false, foreign_key: true
  end
end
