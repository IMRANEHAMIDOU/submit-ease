class AddFieldsToUsers < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :first_name, :string, null: true
    add_column :users, :last_name, :string, null: true
    add_column :users, :gender, :integer, null: true
    add_column :users, :birth_date, :date, null: true
    add_column :users, :phone, :string, null: true
    add_column :users, :avatar, :string, null: true
    add_column :users, :role, :integer
    add_reference :users, :organization, null: true, foreign_key: true
  end
end
