class Autor < ApplicationRecord
  has_many:books
  validates :name ,presence: true
  validates :surname ,presence: true
  has_many :books,dependent: :destroy
validates_associated :books
end
