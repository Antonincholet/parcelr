class CreateCertificateRequests < ActiveRecord::Migration[6.0]
  def change
    create_table :certificate_requests do |t|
      t.string :parcel_section
      t.string :parcel_number
      t.string :parcel_area
      t.string :parcel_address
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
