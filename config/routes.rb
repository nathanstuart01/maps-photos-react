Rails.application.routes.draw do
  root 'home#index'

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
  namespace :api do
    get 'logged_in_user', to: 'users#logged_in_user'
    get 'location', to: 'location#show'
    get 'photos', to: 'photos#index'
    post 'photos', to: 'photos#create'
  end

  get '*unmatched_route', to: 'home#index'
end
