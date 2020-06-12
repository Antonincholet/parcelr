import mapboxgl from 'mapbox-gl';
const MAPBOX_API_KEY = process.env.MAPBOX_API_KEY;
const GEOPORTAIL_API_KEY=process.env.GEOPORTAIL_API_KEY;

const initMapbox = () => {
const mapElement = document.getElementById('map');

if (mapElement) { // only build a map if there's a div#map to inject into
  mapboxgl.accessToken = MAPBOX_API_KEY;
  const initialAddress = mapElement.dataset.initialaddress

  let coordinates = fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${initialAddress}.json?access_token=${MAPBOX_API_KEY}`)
                      .then(response => response.json())
                      .then((data) => {
                        console.log(data);
                        let coordinates = {
                        lng: data.features[0].geometry.coordinates[0],
                        lat: data.features[0].geometry.coordinates[1]};
                        return coordinates})

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

          // map.addSource('selected-parcel', {
          //           'type': 'geojson',
          //           'data': geojsonPolygon
          //           });
          map.addLayer(
            {
            'id': 'wmts-geoportail',
            'type': 'raster',
            'source': 'wmts-geoportail',
            'paint': {}
             },
            'waterway-label'
                );
          // map.addLayer({
          // 'id': 'selected-parcel',
          // 'type': 'fill',
          // 'source': 'selected-parcel',
          // 'layout': {},
          // 'paint': {
          // 'fill-color': '#088',
          // 'fill-opacity': 0.8
          // }
          // });
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
                    'fill-color': '#088',
                    'fill-opacity': 0.8
                    }
                    });
                });
            });


      console.log(coordinates)

  let geojsonPolygon = {
                'type': 'Feature',
                'geometry': {
                  'type': 'Polygon',
                  'coordinates':
                      [[
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
                      ]]
                  }
                }





  }
};

export { initMapbox };
