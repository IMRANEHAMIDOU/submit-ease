class CreateApplicationResponses < ActiveRecord::Migration[8.0]
  def change
    create_table :application_responses do |t|
      t.references :application, null: false, foreign_key: true
      t.references :compaign_field, null: false, foreign_key: true
      t.text :response_value

      t.timestamps
    end
  end
end
