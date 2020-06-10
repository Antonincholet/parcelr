class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home, :map, :parcel ]

  def home
  end

  def map
  end
end
