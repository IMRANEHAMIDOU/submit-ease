class Compaign < ApplicationRecord
  belongs_to :organization

  enum :status, { 
    draft: 0, 
    open: 1, 
    closed: 2, 
    processing: 3 
  }, default:0

end
