class AutorSerializer < ActiveModel::Serializer
  attributes :id, :email, :name, :surname, :books
  has_many:books
end
