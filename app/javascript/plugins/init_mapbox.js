import mapboxgl from 'mapbox-gl';
const MAPBOX_API_KEY = process.env.MAPBOX_API_KEY;
const GEOPORTAIL_API_KEY=process.env.GEOPORTAIL_API_KEY;

const initMapbox = () => {
const mapElement = document.getElementById('map');

if (mapElement) { // only build a map if there's a div#map to inject into
  mapboxgl.accessToken = MAPBOX_API_KEY;
  const initialAddress = mapElement.dataset.initialaddress
  let geojsonPolygon = {
                'type': 'Feature',
                'geometry': {
                  'type': 'Polygon',
                  'coordinates':[]
                  }
                }
  let jsonProperties = {}

  fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${initialAddress}.json?access_token=${MAPBOX_API_KEY}`)
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      let coordinates = {
        lng: data.features[0].geometry.coordinates[0],
        lat: data.features[0].geometry.coordinates[1]};

      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v10',
        zoom: 17,
        center: [ coordinates.lng, coordinates.lat]
      });

        map.on('load', function() {
          map.addSource('wmts-geoportail', {
            'type': 'raster',
            'tiles': [
              `https://wxs.ign.fr/${GEOPORTAIL_API_KEY}/geoportail/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=CADASTRALPARCELS.PARCELLAIRE_EXPRESS&TILEMATRIXSET=PM&TILEMATRIX={z}&TILECOL={x}&TILEROW={y}&STYLE=PCI vecteur&FORMAT=image/png`
              ],
            'tileSize': 256
          });

          map.addLayer(
            {
            'id': 'wmts-geoportail',
            'type': 'raster',
            'source': 'wmts-geoportail',
            'paint': {}
             },
            'waterway-label'
                );
          const marker = new mapboxgl.Marker({ "color": "#33778C" })
            .setLngLat([ coordinates.lng, coordinates.lat])
            .addTo(map);

          fetch(`https://apicarto.ign.fr/api/cadastre/division?apikey=${GEOPORTAIL_API_KEY}&geom={"type": "Point","coordinates":[${coordinates.lng}, ${coordinates.lat}]}`)
                          .then(response => response.json())
                          .then((data) => {
                            console.log(data)
                            geojsonPolygon.geometry.coordinates = data.features[0].geometry.coordinates[0];
                          })


           map.addSource('selected-parcel', {
                    'type': 'geojson',
                    'data': geojsonPolygon
                    });

          map.addLayer({
          'id': 'selected-parcel',
          'type': 'fill',
          'source': 'selected-parcel',
          'layout': {},
          'paint': {
          'fill-color': '#33778C',
          'fill-opacity': 0.6
          }
          });
          map.addControl(new mapboxgl.NavigationControl(), 'top-left');
        });

        map.on('click', function(e) {
              console.log('A click event has occurred at ' + e.lngLat);
              fetch(`https://apicarto.ign.fr/api/cadastre/parcelle?geom={"type": "Point","coordinates":[${e.lngLat.lng}, ${e.lngLat.lat}]}`)
                .then(response => response.json())
                .then((data) => {
                  geojsonPolygon.geometry.coordinates = data.features[0].geometry.coordinates[0]
                  jsonProperties = data.features[0].properties
                  map.getSource('selected-parcel').setData(geojsonPolygon);

                  map.getLayer({
                  'id': 'selected-parcel',
                  'type': 'fill',
                  'source': 'selected-parcel',
                  'layout': {},
                  'paint': {
                  'fill-color': '#33778C',
                  'fill-opacity': 0.6
                  }
                  });

                  const geojsonArea = require('@mapbox/geojson-area');

                  const area = parseInt(geojsonArea.geometry(geojsonPolygon.geometry));

                  new mapboxgl.Popup()
                  .setLngLat(e.lngLat)
                  .setHTML(`<div style="text-align:center"><p>Parcelle n° <strong>${jsonProperties.section} ${jsonProperties.numero}</strong></p>
                    <form action="/parcel" method="get">
                    <input type="hidden" name="lng_input" value="${e.lngLat.lng}">
                    <input type="hidden" name="lat_input" value="${e.lngLat.lat}">
                    <input type="hidden" name="area_input" value="${area}">
                    <input type="hidden" name="city_input" value="${jsonProperties.nom_com}">
                    <input type="hidden" name="section_input" value="${jsonProperties.section}">
                    <input type="hidden" name="numero_input" value="${jsonProperties.numero}">
                    <input type="submit" name="valider ma parcelle" value="valider ma parcelle" class="button my-2 my-sm-0"></form></div>`)
                  .addTo(map);
                });
            });
      });





  }
};

export { initMapbox };
