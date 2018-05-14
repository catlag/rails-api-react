Rails.application.routes.draw do
  devise_for :users

  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  scope '/api' do
    get 'all_from_category', to: 'components#all_from_category'
    get 'update_category', to: 'components#update_category'
    resources :users, only: [:create, :update]
    resources :sessions, only: [:create]


    scope '/auth' do
      get 'is_signed_in', to: 'auth#is_signed_in?'
      delete 'logout', to: 'auth#logout'
    end
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
