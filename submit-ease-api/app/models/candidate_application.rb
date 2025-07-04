class CandidateApplication < ApplicationRecord
  belongs_to :campaign, optional: true
  belongs_to :campaign_profile, optional: true
  belongs_to :organization, optional: true

  enum :application_status, { 
    pending: 0, 
    accepted: 1, 
    rejected: 2 
  }, default: 0
end
