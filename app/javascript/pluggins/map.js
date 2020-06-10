import * as Gp from "../pluggins/GpSDK2D";

var map = Gp.Map.load(
  "map", // html div
  {
  apiKey: "choisirgeoportail",
  // map center
  center : { location : "73 avenue de Paris, Saint-Mandé" },

  style : 'bdparcellaire',
  // map zoom level
  zoom : 18,
   // layers to display
  layersOptions : {
    "GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN-EXPRESS.STANDARD" : {
      opacity : 0.3
      },
    "CADASTRALPARCELS.PARCELS" : {
      opacity : 0.9
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
);


  // var infoDiv = document.getElementById("info");
  // infoDiv.innerHTML = "<p> SDK version " + Gp.sdkVersion + " (" + Gp.sdkDate + ")</p>";

export { map };
