Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: "registrations" }

  root to: 'pages#home'
  get "/map", to: "pages#map"
  get "/parcel", to: "pages#parcel"

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :certificate_requests, only: [ :show, :new, :create ] do
    post "/certificate_requests/:id/send", to: "certificate_requests#send"
  end
end
