class AddPasswordConfirmationToAutors < ActiveRecord::Migration[5.2]
  def change
    add_column :autors, :password_confirmation, :string, limit: 20
  end
end