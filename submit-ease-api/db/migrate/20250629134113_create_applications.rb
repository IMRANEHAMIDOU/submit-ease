class CreateApplications < ActiveRecord::Migration[8.0]
  def change
    create_table :applications do |t|
      t.string :registration_number
      t.references :user, null: false, foreign_key: true
      t.references :compaign, null: false, foreign_key: true
      t.references :compaign_profile, null: false, foreign_key: true
      t.references :organization, null: false, foreign_key: true
      t.integer :application_status, default:0
      t.text :status_reason, null: true
      t.integer :application_score, default:0
      t.decimal :writen_test_average, null: true
      t.boolean :interview_test_authorized, default: false

      t.timestamps
    end
  end
end
