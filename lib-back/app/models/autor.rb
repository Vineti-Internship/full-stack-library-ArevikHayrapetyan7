class Autor < ApplicationRecord
  has_secure_token :token
  validates_uniqueness_of :email
  has_secure_password
  has_many :books
  validates :email, presence: true
  validates :password_collection, presence: true
  validates_presence_of :password_confirmation, :if => :password_collection_changed?
  
  def invalidate_token
    self.update_columns(token: nil)
  end

  def self.validate_login(email, password)
    autor = find_by(email: email)
    if autor&.authenticate(password)
      autor
    end
  end

  validates_uniqueness_of :email
end