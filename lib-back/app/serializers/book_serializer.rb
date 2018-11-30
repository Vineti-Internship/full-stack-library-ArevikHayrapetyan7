class BookSerializer < ActiveModel::Serializer
  attributes :id, :title, :body
  has_one :autor
end
