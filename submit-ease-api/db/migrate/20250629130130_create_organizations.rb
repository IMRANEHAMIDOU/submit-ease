class CreateOrganizations < ActiveRecord::Migration[8.0]
  def change
    create_table :organizations do |t|
      t.string :name
      t.text :description, null:true
      t.string :logo, null: true
      t.string :domain
      t.string :contact_person
      t.string :email
      t.string :contry
      t.string :city
      t.boolean :verified, default:false
      t.boolean :is_active, default: true
      
      t.text :address, null:true
      t.string :website , null:true

      t.timestamps
    end
  end
end
