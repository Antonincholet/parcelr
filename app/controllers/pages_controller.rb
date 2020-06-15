class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home, :map, :parcel ]

  def home
    @display_banner = true
  end

  def map
    @initial_address = params[:query]
  end
end
