class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home, :map, :parcel ]

  def home
    @display_banner = true
  end

  def map
    @initial_address = params[:query]
  end

  def parcel
    @coordinates = params[:coordinates_input]
    @area = params[:area_input]
    @city = params[:city_input]
    @section = params[:section_input]
    @numero = params[:numero_input]
  end
end
