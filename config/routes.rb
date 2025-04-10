Rails.application.routes.draw do
  get 'up' => 'rails/health#show', as: :rails_health_check
  root 'books#index'
  resources :books do
    collection do
      get :search
      post :search_results
    end
  end
end
