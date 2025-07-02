class Organization < ApplicationRecord
    validates :name, presence: true
    validates :domain, presence: true

    has_many :users
end
