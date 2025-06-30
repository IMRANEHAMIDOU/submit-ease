class CreateCompaignFields < ActiveRecord::Migration[8.0]
  def change
    create_table :compaign_fields do |t|
      t.string :label
      t.text :description, null: true
      t.text :field_type
      t.text :options, null: true
      t.integer :order_number, default: 0
      t.boolean :is_required, default: false

      t.timestamps
    end
  end
end
