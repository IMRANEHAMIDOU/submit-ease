class Organization < ApplicationRecord
validates :name, presence: true
validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
validates :domain, presence: true
validates :contact_person, presence: true
validates :contry, presence: true
validates :city, presence: true
end
