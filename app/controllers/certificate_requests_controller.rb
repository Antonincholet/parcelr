class CertificateRequestsController < ApplicationController
  before_action :set_certificate, only: [:show]

  def show; end

  def new
    @certificate_request = CertificateRequest.new
    @user = current_user
  end

  def create
    @certificate_request = CertificateRequest.new(certificate_params)
    @user = current_user
    @certificate_request.user = @user
    if @certificate_request.save
      redirect_to certificate_request_path(@certificate_request)
    else
      render :new
    end
  end

  private

  def set_certificate
    @certificate_request = CertificateRequest.find(params[:id])
  end

  def certificate_params
    params.require(:certificate_request).permit(:parcel_section, :parcel_number, :parcel_area, :parcel_address)
  end
end
