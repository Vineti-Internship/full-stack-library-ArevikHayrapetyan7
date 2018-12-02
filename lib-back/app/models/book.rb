class Book < ApplicationRecord
  belongs_to :autor
  
  
  validates :title ,presence: true
  validates :body ,presence: true
end
