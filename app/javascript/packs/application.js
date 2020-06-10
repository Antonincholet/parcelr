// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)


// ----------------------------------------------------
// Note(lewagon): ABOVE IS RAILS DEFAULT CONFIGURATION
// WRITE YOUR OWN JS STARTING FROM HERE 👇
// ----------------------------------------------------

// External imports
import "bootstrap";

// Internal imports, e.g:
// import { initSelect2 } from '../components/init_select2';
import * as Gp from "../pluggins/GpSDK2D";

document.addEventListener('turbolinks:load', () => {
  // Call your functions here, e.g:
  // initSelect2();
  var map = Gp.Map.load(
      "map", // html div
      {
           // Geoportal access key obtained here : http://professionnels.ign.fr/ign/contrats
           apiKey: "choisirgeoportail",
           // map center
           center : {
               location : "73 avenue de Paris, Saint-Mandé"
           },
           style : 'bdparcellaire',
           // map zoom level
           zoom : 18,
           // layers to display
           layersOptions : {
               "GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN-EXPRESS.STANDARD" : {
                opacity : 0.2
               },
               "CADASTRALPARCELS.PARCELS" : {
                   opacity : 0.7
               }
           },
           // additional tools to display on the map
           controlsOptions : {
               "search" : {
                   maximised : true
               }

           },
           // markers to put in the map
           markersOptions : [{
               content : "<h1>Pôle Géosciences</h1><br/><p>73 avenue de Paris, Saint-Mandé</p><br/><p><a href='http://www.pôle-géosciences.fr/index.htm' target='_blank'>Site Web</a></p>"
           }]
      }
  ) ;


  var infoDiv = document.getElementById("info");
  infoDiv.innerHTML = "<p> SDK version " + Gp.sdkVersion + " (" + Gp.sdkDate + ")</p>";

});
