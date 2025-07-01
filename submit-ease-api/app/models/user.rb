class User < ApplicationRecord
  devise :database_authenticatable,
         :registerable,
         :recoverable,
         :rememberable,
         :validatable,
         :jwt_authenticatable,
         jwt_revocation_strategy: Devise::JWT::RevocationStrategies::Null

  belongs_to :organization, optional: true

  enum :role, { candidate: 0, admin: 1, superadmin: 2 }, default: 0
end
