class CandidateApplication < ApplicationRecord
  belongs_to :user
  belongs_to :campaign
  belongs_to :campaign_profile
  belongs_to :organization
  has_many :application_responses

  enum :application_status, { 
    pending: 0, 
    accepted: 1, 
    rejected: 2 
  }, default: 0


  before_create :generate_registration_number

  def generate_registration_number
    current_count = CandidateApplication.where(campaign_id: campaign_id).count
    registration_number = current_count + 1
    self.registration_number = registration_number.to_s.rjust(6, '0')
  end

end
