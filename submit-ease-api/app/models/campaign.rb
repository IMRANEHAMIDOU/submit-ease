class Campaign < ApplicationRecord
  belongs_to :organization
  
  has_many :campaign_fields, dependent: :destroy
  has_many :campaign_profiles, dependent: :destroy
  has_many :candidate_applications
  
  enum :status, { 
    draft: 0, 
    open: 1, 
    closed: 2, 
    processing: 3 
  }, default:0

end
