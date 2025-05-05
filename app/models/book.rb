require 'net/http'
require 'uri'

class Book < ApplicationRecord
  validates :title, presence: true
  validates :author, presence: true

  scope :search, ->(params) { where("title LIKE ? OR author LIKE ?", "%#{params}%", "%#{params}%") }
end
