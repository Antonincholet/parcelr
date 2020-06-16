# require 'json'
# require 'open-uri'
require 'geocoder'

class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home, :map, :parcel ]

  def home
    @display_banner = true
  end

  def map
    @initial_address = params[:query]
  end

  def parcel
    @coordinates = [params[:lng_input], params[:lat_input]]
    @address = reverse_geocode(params[:lng_input], params[:lat_input])
    @area = params[:area_input]
    @city = params[:city_input]
    @section = params[:section_input]
    @numero = params[:numero_input]
  end

  private

  def reverse_geocode(lng, lat)
    results = Geocoder.search([lat, lng])
    results.first.data
  end
  # url = 'https://api.github.com/users/ssaunier'
  # user_serialized = open(url).read
  # user = JSON.parse(user_serialized)
end
