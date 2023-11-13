# frozen_string_literal: true

class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :session_id, null: false
      t.integer :count, null: false, default: 0

      t.timestamps
    end
  end
end
