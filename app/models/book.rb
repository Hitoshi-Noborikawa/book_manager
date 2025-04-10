require 'net/http'
require 'uri'

class Book < ApplicationRecord
  validates :title, presence: true
  validates :author, presence: true

  scope :search, ->(params) { where("title LIKE ? OR author LIKE ?", "%#{params}%", "%#{params}%") }

  def self.search_open_library(title)
    q_string = URI.encode_www_form_component(title)
    url = URI.parse("https://openlibrary.org/search.json?q=#{q_string}")
    res = Net::HTTP.get_response(url)
    return nil unless res.is_a?(Net::HTTPSuccess)

    data = JSON.parse(res.body)
    first_book = data["docs"].first

    return nil unless first_book

    {
      title: first_book["title"],
      author: first_book["author_name"]&.first,
      cover_url: first_book["cover_i"] ? "https://covers.openlibrary.org/b/id/#{first_book["cover_i"]}-L.jpg" : nil
    }
  end
end
