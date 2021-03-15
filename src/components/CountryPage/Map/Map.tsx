import React, { useEffect, useCallback } from 'react';

interface IMap {
    geoCenter: Array<number>;
    countryCode: string;
}

const mapboxgl = require('mapbox-gl');
mapboxgl.accessToken = 'pk.eyJ1Ijoia29waWthdCIsImEiOiJja203amx5dmkwNGt2Mm9waHd0NG82MWFtIn0.h_8idiDKrB-FaaE6eX8ixg';

const Map: React.FC<IMap> = ({geoCenter, countryCode}) => {

  const createMap = useCallback(
    () => {
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: geoCenter,
            zoom: 9,
        })

        const marker = new mapboxgl.Marker({
            color: "#1c1c1c",
        })

        map.addControl(new mapboxgl.FullscreenControl())
            .on('load', () => {
            map.addSource('countries', {
            type: 'vector',
            url: 'mapbox://mapbox.country-boundaries-v1'
            });

            const matchExpression = ['match', ['get', 'iso_3166_1_alpha_3']];
                matchExpression.push(countryCode, 'rgba(201, 171, 248, 0.2)'); //color for choose country
                matchExpression.push('rgba(0, 0, 0, 0)'); //transparent color for other country
            
            map.addLayer(
            {
            'id': 'countries-join',
            'type': 'fill',
            'source': 'countries',
            'source-layer': 'country_boundaries',
            'paint': {
                'fill-color': matchExpression
                    }
            },
            'admin-1-boundary-bg'
            );
        });

        marker.setLngLat(geoCenter)
            .addTo(map);

    }, [geoCenter, countryCode ]
  )

  useEffect(() => { createMap() }, [createMap])
  
  return (
      <div id="map"/>
  );
};

export default Map;