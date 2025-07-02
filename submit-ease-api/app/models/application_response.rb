class ApplicationResponse < ApplicationRecord
  belongs_to :candidate_application
  belongs_to :compaign_field
end
