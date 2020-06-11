import mapboxgl from 'mapbox-gl';
const API_KEY = process.env.MAPBOX_API_KEY;


const initMapbox = () => {
  const mapElement = document.getElementById('map');

  if (mapElement) { // only build a map if there's a div#map to inject into
    mapboxgl.accessToken = API_KEY;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v10'
      zoom: 17,
      center: [ 2.34832605,48.86661848]
    });

    map.on('load', function() {
      map.addSource('wms-test-source', {
        'type': 'raster',
        'tiles': [
          'https://wxs.ign.fr/ppjma0ufmaux7dypz4xxi99j/geoportail/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=CADASTRALPARCELS.PARCELLAIRE_EXPRESS&TILEMATRIXSET=PM&TILEMATRIX={z}&TILECOL={x}&TILEROW={y}&STYLE=PCI vecteur&FORMAT=image/png'
          ],
        'tileSize': 256
      });
      map.addLayer(
        {
        'id': 'wms-test-layer',
        'type': 'raster',
        'source': 'wms-test-source',
        'paint': {}
         },
        'waterway-label'
            );
    });

    map.on('load', function() {
        map.addSource('maine', {
        'type': 'geojson',
        'data': {
        'type': 'Feature',
        'geometry': {
        'type': 'Polygon',
        'coordinates': [
        [
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
        ]
        }
        }
        });
        map.addLayer({
        'id': 'maine',
        'type': 'fill',
        'source': 'maine',
        'layout': {},
        'paint': {
        'fill-color': '#088',
        'fill-opacity': 0.8
        }
        });
        });
  }
};

export { initMapbox };
