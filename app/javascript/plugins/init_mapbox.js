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
          const marker = new mapboxgl.Marker()
            .setLngLat([ coordinates.lng, coordinates.lat])
            .addTo(map);

          fetch(`https://apicarto.ign.fr/api/cadastre/division?geom={"type": "Point","coordinates":[${coordinates.lng}, ${coordinates.lat}]}`)
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
        });

        map.on('click', function(e) {
              console.log('A click event has occurred at ' + e.lngLat);
              fetch(`https://apicarto.ign.fr/api/cadastre/parcelle?geom={"type": "Point","coordinates":[${e.lngLat.lng}, ${e.lngLat.lat}]}`)
                .then(response => response.json())
                .then((data) => {
                  geojsonPolygon.geometry.coordinates = data.features[0].geometry.coordinates[0]
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
                });
            });
      });





  }
};

export { initMapbox };
