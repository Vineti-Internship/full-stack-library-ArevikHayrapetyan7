class AddTokenToAutors < ActiveRecord::Migration[5.2]
  def change
    add_column :autors, :token, :string
  end
end