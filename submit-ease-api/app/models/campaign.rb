class Campaign < ApplicationRecord
  belongs_to :organization
  
  before_create :generate_publication_link

  has_many :campaign_fields, dependent: :destroy
  has_many :campaign_profiles, dependent: :destroy
  has_many :candidate_applications
  
  enum :status, { 
    draft: 0, 
    open: 1, 
    closed: 2, 
    processing: 3 
  }, default:0

  private
  def generate_publication_link
    base_link = title.paramsterize
    unique_part = SecureRandom.hex(2)
    self.publication_link = "#{base_link}-#{unique_part}"
  end
end
