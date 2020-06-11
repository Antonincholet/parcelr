import * as Gp from "../pluggins/GpSDK2D";
const API_KEY = process.env.GEOPORTAIL_API_KEY;

 const rings = [
                [
                  2.34832605,
                  48.86661848
                ],
                [
                  2.34828322,
                  48.86648955
                ],
                [
                  2.34827507,
                  48.86646585
                ],
                [
                  2.3482251,
                  48.86631952
                ],
                [
                  2.34821024,
                  48.86627582
                ],
                [
                  2.34815233,
                  48.8661648
                ],
                [
                  2.34802482,
                  48.86619136
                ],
                [
                  2.348028,
                  48.86619812
                ],
                [
                  2.34791539,
                  48.86622116
                ],
                [
                  2.3479122,
                  48.86621494
                ],
                [
                  2.34784359,
                  48.86622904
                ],
                [
                  2.34795331,
                  48.86643694
                ],
                [
                  2.34798364,
                  48.86643116
                ],
                [
                  2.34800551,
                  48.86651367
                ],
                [
                  2.3480368,
                  48.8666384
                ],
                [
                  2.34803992,
                  48.866651
                ],
                [
                  2.34804659,
                  48.86667308
                ],
                [
                  2.34806791,
                  48.86666924
                ],
                [
                  2.3481797,
                  48.86664718
                ],
                [
                  2.34827974,
                  48.86662577
                ],
                [
                  2.34832605,
                  48.86661848
                ]
              ]
const polygon = new ol.geom.Polygon([rings]);
polygon.applyTransform(ol.proj.getTransform('EPSG:4326', 'EPSG:3857'))
// polygon.transform('EPSG:4326', 'EPSG:3857');
// Create feature with polygon.
const feature = new ol.Feature(polygon);
// Create vector source and the feature to it.
let vectorSource = new ol.source.Vector();
vectorSource.addFeature(feature);
// Create vector layer attached to the vector source.
const vectorLayer = new ol.layer.Vector({
  source: vectorSource
});


var map = Gp.Map.load(
  "map", // html div
  {
  apiKey: API_KEY,
  // map center
  center : [2.348295, 48.866623],
   // {"type": "Point","coordinates":[2.348295, 48.866623]}

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
  mapEventsOptions : {
      // when map has finished to initialize and to render
      "mapLoaded" : function(evt) {
      alert("map ready !") ;
      map.addLayer(vectorLayer);
      }
    },

  markersOptions : [{
    content : "<h1>Pôle Géosciences</h1><br/><p>73 avenue de Paris, Saint-Mandé</p><br/><p><a href='http://www.pôle-géosciences.fr/index.htm' target='_blank'>Site Web</a></p>"
   }]
  }
);


  // var infoDiv = document.getElementById("info");
  // infoDiv.innerHTML = "<p> SDK version " + Gp.sdkVersion + " (" + Gp.sdkDate + ")</p>";

export { map };
