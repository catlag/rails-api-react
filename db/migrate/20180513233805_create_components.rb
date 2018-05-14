class CreateComponents < ActiveRecord::Migration[5.0]
  def change
    create_table :components do |t|
      t.string :name
      t.integer :order
      t.text :urls, array: true, default: []
      t.string :category

      t.timestamps
    end
  end
end
