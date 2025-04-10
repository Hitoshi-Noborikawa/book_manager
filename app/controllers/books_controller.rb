class BooksController < ApplicationController
  before_action :set_book, only: %i[show edit update destroy]

  def index
    @books = if params[:q].present?
      Book.search(params[:q])
    else
      Book.all
    end
  end

  def show
  end

  def new
    @book = Book.new(
      title: params[:title],
      author: params[:author],
      cover_url: params[:cover_url]
    )
  end

  def edit
  end

  def create
    @book = Book.new(book_params)

    if @book.save
      redirect_to @book, notice: '本を作成しました'
    else
      render :new, status: :unprocessable_entity
    end
  end

  def update
    if @book.update(book_params)
      redirect_to @book, notice: '本の内容を更新しました'
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @book.destroy!

    redirect_to books_path, status: :see_other, notice: '本を削除しました'
  end

  def search
  end

  def search_results
    @book_info = Book.search_open_library(params[:title])
  end

  private

  def set_book
    @book = Book.find(params.expect(:id))
  end

  def book_params
    params.require(:book).permit(:title, :author, :publisher, :published_on, :description, :cover_url)
  end
end
