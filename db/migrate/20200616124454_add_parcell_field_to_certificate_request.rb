class AddParcellFieldToCertificateRequest < ActiveRecord::Migration[6.0]
  def change
    add_column :certificate_requests, :parcel_street_number, :string
    add_column :certificate_requests, :parcel_street, :string
    add_column :certificate_requests, :parcel_zip_code, :string
    add_column :certificate_requests, :parcel_city, :string
    remove_column :certificate_requests, :parcel_address
  end
end
