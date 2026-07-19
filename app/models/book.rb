class Book < ApplicationRecord
  has_many :comments

  validates :title, presence: true
  validates :author, presence: true

  scope :search, ->(params) { where("title LIKE ? OR author LIKE ?", "%#{params}%", "%#{params}%") }
end
