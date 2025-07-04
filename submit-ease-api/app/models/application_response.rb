class ApplicationResponse < ApplicationRecord
  belongs_to :candidate_application
  belongs_to :campaign_field
end
