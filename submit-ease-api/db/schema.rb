# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_07_01_221142) do
  create_table "application_responses", force: :cascade do |t|
    t.integer "candidate_application_id", null: false
    t.integer "compaign_field_id", null: false
    t.text "response_value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["candidate_application_id"], name: "index_application_responses_on_candidate_application_id"
    t.index ["compaign_field_id"], name: "index_application_responses_on_compaign_field_id"
  end

  create_table "candidate_applications", force: :cascade do |t|
    t.string "registration_number"
    t.integer "user_id", null: false
    t.integer "compaign_id", null: false
    t.integer "compaign_profile_id", null: false
    t.integer "organization_id", null: false
    t.integer "application_status", default: 0
    t.text "status_reason"
    t.integer "application_score", default: 0
    t.decimal "writen_test_average"
    t.boolean "interview_test_authorized", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["compaign_id"], name: "index_candidate_applications_on_compaign_id"
    t.index ["compaign_profile_id"], name: "index_candidate_applications_on_compaign_profile_id"
    t.index ["organization_id"], name: "index_candidate_applications_on_organization_id"
    t.index ["user_id"], name: "index_candidate_applications_on_user_id"
  end

  create_table "compaign_fields", force: :cascade do |t|
    t.string "label"
    t.text "description"
    t.text "field_type"
    t.text "options"
    t.integer "order_number", default: 0
    t.boolean "is_required", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "compaign_profiles", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.integer "positions_available"
    t.integer "compaign_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["compaign_id"], name: "index_compaign_profiles_on_compaign_id"
  end

  create_table "compaigns", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.boolean "has_writen_test", default: false
    t.boolean "has_interview", default: false
    t.datetime "opening_date"
    t.datetime "closing_date"
    t.boolean "is_application_limited", default: false
    t.integer "max_application", default: 0
    t.integer "status", default: 0
    t.integer "organization_id", null: false
    t.string "publication_link", default: ""
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["organization_id"], name: "index_compaigns_on_organization_id"
  end

  create_table "organizations", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.string "logo"
    t.string "domain"
    t.string "contact_person"
    t.string "email"
    t.string "contry"
    t.string "city"
    t.boolean "verified", default: false
    t.boolean "is_active", default: true
    t.text "address"
    t.string "website"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "first_name"
    t.string "last_name"
    t.integer "gender"
    t.date "birth_date"
    t.string "phone"
    t.string "avatar"
    t.integer "role"
    t.integer "organization_id"
    t.boolean "is_active", default: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["organization_id"], name: "index_users_on_organization_id"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "application_responses", "candidate_applications"
  add_foreign_key "application_responses", "compaign_fields"
  add_foreign_key "candidate_applications", "compaign_profiles"
  add_foreign_key "candidate_applications", "compaigns"
  add_foreign_key "candidate_applications", "organizations"
  add_foreign_key "candidate_applications", "users"
  add_foreign_key "compaign_profiles", "compaigns"
  add_foreign_key "compaigns", "organizations"
  add_foreign_key "users", "organizations"
end
