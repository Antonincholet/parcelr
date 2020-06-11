require 'fillable-pdf'

class CertificateRequestsController < ApplicationController
  PATH_CERFA_M = "./app/assets/cerfa/cerfa-M.pdf"
  PATH_CERFA = "./app/assets/cerfa/cerfa-1.pdf"

  def new
    # certificate = CertificateRequest.new
  end

  def show
    setfields
    showpdf
  end

  def create
  end

  private

  def showpdf
    pdf_filename = File.join(Rails.root, PATH_CERFA_M)
    send_file(pdf_filename, filename: "CERFA.pdf", disposition: 'inline', type: "application/pdf")
  end

  def opencerfa
    FillablePDF.new PATH_CERFA
  end

  def save(file)
    file.save_as(PATH_CERFA_M)
  end

  def setobject(file)
    file.set_field(:"topmostSubform[0].Page1[0].D6A_CUA[0]", 'Oui')
  end

  def setgender(file)
    file.set_field(:"topmostSubform[0].Page1[0].D1H_homme[0]", 'Oui')
  end

  def setuser(file)
    file.set_fields("topmostSubform[0].Page1[0].D1P_prenom[0]": 'Paul Muadib',
                    "topmostSubform[0].Page1[0].D1N_nom[0]": 'ATREIDE')
  end

  # def setaddress(file)
  #   file.set_fields("topmostSubform[0].Page1[0].D3N_numero[0]": '10',
  #                   "topmostSubform[0].Page1[0].D3V_voie[0]": "rue des Dunes",
  #                   "topmostSubform[0].Page1[0].D3L_localite[0]": "Arhakis",
  #                   "topmostSubform[0].Page1[0].D3C_code[0]": "13240",
  #                   "topmostSubform[0].Page1[0].D3T_telephone[0]": "0123456789")
  # end

  # def setmail(file)
  #   file.set_fields("topmostSubform[0].Page1[0].D5A_acceptation[0]": true,
  #                   "topmostSubform[0].Page1[0].D5GE1_email[0]": "paul_atreide",
  #                   "topmostSubform[0].Page1[0].D5GE2_email[0]": "gmail.com")
  # end

  # def setterrain(file)
  #   file.set_fields("topmostSubform[0].Page1[0].T2Q_numero[0]": "20",
  #                   "topmostSubform[0].Page1[0].T2V_voie[0]": "bd des rires",
  #                   "topmostSubform[0].Page1[0].T2L_localite[0]": "Paris",
  #                   "topmostSubform[0].Page1[0].T2C_code[0]": "75001")
  # end

  # def setparcel(file)
  #   file.set_fields("topmostSubform[0].Page1[0].T2F_prefixe[0]": "001",
  #                   "topmostSubform[0].Page1[0].T2S_section[0]": "AD",
  #                   "topmostSubform[0].Page1[0].T2N_numero[0]": "1415")
  # end

  def setfields
    cerfa = opencerfa
    setobject(cerfa)
    setgender(cerfa)
    setuser(cerfa)
    save(cerfa)
    # setaddress(cerfa)
    # setmail(cerfa)
    # setterrain(cerfa)
    # setparcel(cerfa)
  end
end
