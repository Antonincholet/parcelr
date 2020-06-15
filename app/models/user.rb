class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :certificate_requests, dependent: :destroy

  validates :last_name, :first_name, :prefix, :street_number, :street, :zip_code, :city, presence: true
end
