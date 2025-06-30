class CandidateApplication < ApplicationRecord
  belongs_to :user
  belongs_to :compaign
  belongs_to :compaign_profile
  belongs_to :organization

  enum :application_status, { 
    pending: 0, 
    accepted: 1, 
    rejected: 2 
  }, default: 0
end
