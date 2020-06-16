# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_06_16_124454) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "certificate_requests", force: :cascade do |t|
    t.string "parcel_section"
    t.string "parcel_number"
    t.string "parcel_area"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "parcel_street_number"
    t.string "parcel_street"
    t.string "parcel_zip_code"
    t.string "parcel_city"
    t.index ["user_id"], name: "index_certificate_requests_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "prefix"
    t.string "last_name"
    t.string "first_name"
    t.string "street_number"
    t.string "street"
    t.string "zip_code"
    t.string "city"
    t.string "phone"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "certificate_requests", "users"
end
