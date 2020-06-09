class AddUserInformations < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :prefix, :string
    add_column :users, :last_name, :string
    add_column :users, :first_name, :string
    add_column :users, :street_number, :string
    add_column :users, :street, :string
    add_column :users, :zip_code, :string
    add_column :users, :city, :string
    add_column :users, :phone, :string
  end
end
