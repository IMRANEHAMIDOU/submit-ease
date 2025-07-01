class CreateCampaigns < ActiveRecord::Migration[8.0]
  def change
    create_table :campaigns do |t|
      t.string :title
      t.text :description
      t.boolean :has_writen_test, default:false
      t.boolean :has_interview , default:false
      t.datetime :opening_date
      t.datetime :closing_date
      t.boolean :is_application_limited , default:false
      t.integer :max_application , default:0
      t.integer :status , default:0
      t.references :organization, null: false, foreign_key: true
      t.string :publication_link, default:''

      t.timestamps
    end
  end
end
